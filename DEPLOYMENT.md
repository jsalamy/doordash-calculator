# Azure Web App Deployment Guide

This guide will walk you through deploying the DoorDash Calculator to Azure App Service using GitHub Actions.

## Prerequisites

- An Azure account ([Sign up for free](https://azure.microsoft.com/free/))
- A GitHub account
- Your code pushed to a GitHub repository

## Step 1: Create Azure App Service

1. **Sign in to Azure Portal**
   - Go to [portal.azure.com](https://portal.azure.com)
   - Sign in with your Azure account

2. **Create a new App Service**
   - Click "Create a resource" or use the search bar
   - Search for "Web App" and select it
   - Click "Create"

3. **Configure the Web App**
   - **Subscription**: Select your Azure subscription
   - **Resource Group**: Create new or select existing
   - **Name**: Choose a unique name (e.g., `doordash-calculator-app`)
     - This will be your app URL: `https://your-app-name.azurewebsites.net`
   - **Publish**: Select "Code"
   - **Runtime stack**: Select "Node 20 LTS" or "Node 18 LTS"
   - **Operating System**: Select "Linux" (recommended) or "Windows"
   - **Region**: Select a region close to your users
   - **App Service Plan**: Create new or select existing
     - For the free tier, select "Free F1" (limited resources)
     - For production, select "Basic B1" or higher

4. **Review and Create**
   - Review your settings
   - Click "Create" and wait for deployment to complete

## Step 2: Get Publish Profile

1. **Navigate to your App Service**
   - Go to the Azure Portal
   - Find and open your newly created Web App

2. **Download Publish Profile**
   - Click "Get publish profile" button in the top toolbar
   - Save the `.PublishSettings` file to your computer
   - **Important**: Keep this file secure - it contains deployment credentials

## Step 3: Configure GitHub Secrets

1. **Open your GitHub repository**
   - Navigate to your repository on GitHub
   - Go to **Settings** → **Secrets and variables** → **Actions**

2. **Add Required Secrets**

   **AZURE_WEBAPP_NAME**
   - Click "New repository secret"
   - Name: `AZURE_WEBAPP_NAME`
   - Value: The name of your Azure Web App (e.g., `doordash-calculator-app`)
   - Click "Add secret"

   **AZURE_PUBLISH_PROFILE**
   - Click "New repository secret"
   - Name: `AZURE_PUBLISH_PROFILE`
   - Value: Open the `.PublishSettings` file you downloaded and copy its entire contents
   - Click "Add secret"

## Step 4: Configure Azure App Service

1. **Set Node.js Version** (if needed)
   - In Azure Portal, go to your App Service
   - Navigate to **Configuration** → **General settings**
   - Set **Stack** to "Node.js"
   - Set **Node version** to "20 LTS" or "18 LTS"
   - Click "Save"

2. **Configure Startup Command** (for Linux)
   - In **Configuration** → **General settings**
   - Add a startup command (if deploying to Linux):
     ```
     pm2 serve /home/site/wwwroot --no-daemon --spa
     ```
   - Or use Azure's built-in static site hosting (recommended for static sites)

3. **Enable Static Website Hosting** (Recommended)
   - For a Vite React app, you can use Azure's static website feature
   - In **Configuration** → **General settings**
   - Set **Always On** to "On" (if using a paid tier)
   - The `web.config` file in the `public/` folder will handle routing

## Step 5: Deploy

1. **Push to GitHub**
   - The GitHub Actions workflow will automatically trigger on push to `main` branch
   - You can also manually trigger it from the **Actions** tab in GitHub

2. **Monitor Deployment**
   - Go to the **Actions** tab in your GitHub repository
   - Click on the workflow run to see deployment progress
   - Wait for the workflow to complete successfully

3. **Verify Deployment**
   - Once deployment completes, visit your app URL:
     `https://your-app-name.azurewebsites.net`
   - Your app should be live!

## Troubleshooting

### Build Fails
- Check the GitHub Actions logs for specific errors
- Ensure `package.json` has all required dependencies
- Verify Node.js version matches in workflow and Azure settings

### App Not Loading
- Check Azure App Service logs: **Monitoring** → **Log stream**
- Verify `web.config` is in the `dist/` folder after build
- Ensure the correct files are in the `dist/` directory

### 404 Errors on Refresh
- Verify `web.config` is present in the `public/` folder (it will be copied to `dist/`)
- Check that IIS URL Rewrite module is enabled (for Windows App Service)

### Deployment Credentials Error
- Re-download the publish profile from Azure Portal
- Update the `AZURE_PUBLISH_PROFILE` secret in GitHub

## Manual Deployment (Alternative)

If you prefer to deploy manually without GitHub Actions:

1. **Build locally**
   ```bash
   npm install
   npm run build
   ```

2. **Deploy using Azure CLI**
   ```bash
   az login
   az webapp deploy --resource-group <resource-group-name> --name <app-name> --src-path ./dist
   ```

3. **Or use VS Code Azure Extension**
   - Install "Azure App Service" extension
   - Right-click on `dist` folder → "Deploy to Web App"

## Cost Considerations

- **Free Tier (F1)**: Limited to 1 GB storage, 60 minutes/day compute time
- **Basic Tier (B1)**: ~$13/month, suitable for production
- **Standard Tier (S1)**: ~$70/month, better performance and scaling

For a static React app, the Free tier may be sufficient for testing, but consider Basic or higher for production use.

## Additional Resources

- [Azure App Service Documentation](https://docs.microsoft.com/azure/app-service/)
- [GitHub Actions for Azure](https://github.com/azure/actions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

