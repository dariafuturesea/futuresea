# Decap CMS Setup Instructions

Decap CMS (formerly Netlify CMS) is a Git-based content management system that allows you to manage content directly from your deployed website.

> **⚠️ IMPORTANT: Netlify Identity is Deprecated**
>
> Netlify Identity is now deprecated and no longer receives support. While existing implementations continue to work, it's recommended to use one of the alternative authentication methods below for new setups.

## Authentication Options

You have three main options for Decap CMS authentication:

### Option 1: GitHub OAuth (Recommended for Simple Setups)
- ✅ Free and simple to set up
- ✅ No third-party service required
- ✅ Works well for small teams
- ❌ Requires users to have GitHub accounts

### Option 2: Auth0 (Recommended by Netlify)
- ✅ More features and better support
- ✅ Multiple authentication providers
- ✅ Better user management
- ❌ More complex setup
- ❌ May have costs for larger teams

### Option 3: Netlify Identity (Legacy - Not Recommended)
- ⚠️ Deprecated - existing implementations only
- ⚠️ No support for new issues
- ❌ Not recommended for new projects

---

## Setup Method A: GitHub OAuth (Recommended)

This method uses GitHub for authentication directly, without requiring Netlify Identity.

### Step 1: Create a GitHub OAuth App

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click **New OAuth App**
3. Fill in the details:
   - **Application name**: `FutureSea CMS` (or any name)
   - **Homepage URL**: `https://futuresea.eu`
   - **Authorization callback URL**: `https://api.netlify.com/auth/done`
4. Click **Register application**
5. Copy the **Client ID**
6. Click **Generate a new client secret** and copy it

### Step 2: Add GitHub OAuth to Netlify

1. Go to your Netlify dashboard
2. Navigate to **Site Settings** → **Access control** → **OAuth**
3. Under **Authentication providers**, click **Install provider**
4. Select **GitHub**
5. Enter your **Client ID** and **Client Secret** from Step 1
6. Click **Install**

### Step 3: Update CMS Configuration

Use this backend configuration in `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: dariafuturesea/futuresea
  branch: main
  base_url: https://api.netlify.com
  auth_endpoint: auth
```

---

## Setup Method B: Auth0 (For Advanced Features)

### Step 1: Set Up Auth0

1. Create a free Auth0 account at https://auth0.com
2. Create a new application (Single Page Application)
3. Configure allowed callbacks:
   - `https://futuresea.eu/admin/`
   - `http://localhost:4321/admin/` (for local dev)
4. Configure allowed logout URLs: same as above
5. Note your **Domain** and **Client ID**

### Step 2: Install Netlify Auth0 Extension

1. Follow the guide: https://www.netlify.com/blog/auth0-extension-identity-changes/
2. Install the Auth0 extension from Netlify's integrations
3. Configure the extension with your Auth0 credentials

### Step 3: Update CMS Configuration

```yaml
backend:
  name: git-gateway
  branch: main
  auth_endpoint: https://your-auth0-domain/authorize
```

---

## Setup Method C: Netlify Identity (Legacy - Existing Sites Only)

> ⚠️ **Only use this if you already have Netlify Identity set up.** Not recommended for new projects.

### Step 1: Enable Netlify Identity

1. Go to your Netlify dashboard
2. Navigate to **Site Settings** → **Identity**
3. Click **Enable Identity**
4. Under **Registration preferences**, select **Invite only**

### Step 2: Enable Git Gateway

1. In the same Identity settings page
2. Scroll to **Services** → **Git Gateway**
3. Click **Enable Git Gateway**

---

## Common Setup Steps (All Methods)

### Step 1: Create Admin Page

Create a new file at `public/admin/index.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Content Manager</title>
  </head>
  <body>
    <!-- Include the script that builds the page and powers Decap CMS -->
    <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
  </body>
</html>
```

### Step 2: Create CMS Configuration

Create a new file at `public/admin/config.yml`:

**For GitHub OAuth:**
```yaml
backend:
  name: github
  repo: dariafuturesea/futuresea
  branch: main
  base_url: https://api.netlify.com
  auth_endpoint: auth

media_folder: "src/assets/images"
public_folder: "~/assets/images"

collections:
```

**For Auth0 or Netlify Identity (legacy):**
```yaml
backend:
  name: git-gateway
  branch: main

media_folder: "src/assets/images"
public_folder: "~/assets/images"

collections:
  - name: "posts"
    label: "Blog Posts"
    label_singular: "Blog Post"
    folder: "data/blog"
    create: true
    delete: true
    slug: "{{slug}}"
    fields:
      - name: "publishDate"
        label: "Publish Date"
        widget: "datetime"
        format: "YYYY-MM-DDTHH:mm:ssZ"
        date_format: "DD MMM YYYY"
        time_format: false
      - name: "title"
        label: "Post Title"
        widget: "string"
      - name: "description"
        label: "Description"
        widget: "string"
        required: false
      - name: "image"
        label: "Featured Image"
        widget: "image"
        choose_url: true
        required: false
      - name: "category"
        label: "Categories"
        widget: "list"
        required: false
      - name: "tags"
        label: "Tags"
        widget: "list"
        required: false
      - name: "body"
        label: "Post Body"
        widget: "markdown"
```

### Step 3: Add Authentication Widget (If Using Netlify Identity Legacy)

**⚠️ Only needed for Netlify Identity (deprecated method)**

If using the legacy Netlify Identity, add the widget script to your main layout file:

```html
<script is:inline>
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }
</script>
<script is:inline src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
```

**For GitHub OAuth or Auth0, this script is NOT needed.**

### Step 4: Deploy Your Changes

1. Commit and push your changes:
   ```bash
   git add public/admin/
   git commit -m "Add Decap CMS configuration"
   git push
   ```

2. Wait for Netlify to deploy

### Step 5: Access the CMS

**For GitHub OAuth:**
1. Navigate to `https://futuresea.eu/admin/`
2. Click **Login with GitHub**
3. Authorize the app
4. You should now see the Decap CMS dashboard!

**For Auth0:**
1. Navigate to `https://futuresea.eu/admin/`
2. Click **Login**
3. Use your Auth0 credentials
4. You should now see the Decap CMS dashboard!

**For Netlify Identity (legacy):**
1. Go to your Netlify dashboard → **Identity** tab
2. Click **Invite users** and invite yourself
3. Check your email and set your password
4. Navigate to `https://futuresea.eu/admin/`
5. Login with your credentials

## Troubleshooting

### "Error loading config.yml"
- Check that `public/admin/config.yml` exists and has valid YAML syntax
- Verify the file is being deployed (check in `dist/admin/config.yml` after build)
- Ensure the `backend` configuration matches your chosen auth method

### "Authentication failed" (GitHub OAuth)
- Verify the OAuth app is configured correctly in GitHub
- Check that the callback URL is exactly `https://api.netlify.com/auth/done`
- Ensure the OAuth provider is installed in Netlify
- Verify the repository name in `config.yml` is correct

### "Authentication failed" (Netlify Identity Legacy)
- Verify Git Gateway is enabled in Netlify
- Check that you're logged into Netlify Identity
- Try clearing your browser cache and cookies

### Images not uploading
- Verify the `media_folder` path exists: `src/assets/images`
- Check repository permissions in GitHub
- For GitHub OAuth: Ensure the OAuth app has write access to the repo
- For Git Gateway: Ensure Git Gateway has write access

### "Cannot read property 'on' of undefined"
- This error only applies to Netlify Identity (legacy)
- Make sure the Netlify Identity widget script is loaded
- For GitHub OAuth, remove the Identity widget scripts

## Using the CMS

### Creating a New Post

1. Log into the CMS at `/admin/`
2. Click **Blog Posts** in the sidebar
3. Click **New Blog Post**
4. Fill in the fields:
   - **Publish Date**: When the post should be published
   - **Title**: Your post title
   - **Description**: Short description for SEO
   - **Featured Image**: Upload or select an image
   - **Categories**: Add relevant categories
   - **Tags**: Add relevant tags
   - **Body**: Write your content in Markdown
5. Click **Publish** → **Publish now**

### Editing an Existing Post

1. Click **Blog Posts** in the sidebar
2. Click on the post you want to edit
3. Make your changes
4. Click **Publish** → **Publish now**

### Workflow (Optional)

You can enable editorial workflow for a review process:

In `config.yml`, add:
```yaml
publish_mode: editorial_workflow
```

This creates a draft/review/publish workflow with pull requests.

## Alternative: Local Development

To test Decap CMS locally:

1. Install the Decap CMS Proxy Server:
   ```bash
   npx decap-server
   ```

2. Update `config.yml` to use local backend:
   ```yaml
   backend:
     name: git-gateway
     branch: main

   local_backend: true
   ```

3. Access the CMS at `http://localhost:4321/admin/`

## Security Best Practices

### For GitHub OAuth:
1. **Limit repository access** - Only give access to users who need it
2. **Enable 2FA** on all GitHub accounts with write access
3. **Use organization teams** for better access control
4. **Review OAuth app permissions** regularly
5. **Monitor commits** from the CMS in your Git history

### For Auth0:
1. **Enable MFA** for all users
2. **Use role-based access control** (RBAC)
3. **Configure brute force protection**
4. **Set up anomaly detection**
5. **Review Auth0 logs** regularly

### For Netlify Identity (Legacy):
1. **Keep registration "Invite only"**
2. **Enable 2FA** for your Netlify account
3. **Consider migrating** to GitHub OAuth or Auth0
4. **Regularly review users** and remove inactive accounts

### General:
- **Monitor** all Git activity from Decap CMS commits
- **Use branch protection rules** on your main branch
- **Implement a review workflow** for content changes if needed

## Migration from Netlify Identity

If you're currently using Netlify Identity and want to migrate:

### Option 1: Migrate to Auth0
1. Follow Netlify's migration guide: https://www.netlify.com/blog/auth0-extension-identity-changes/
2. Contact Netlify support to export your Identity data (including hashed passwords)
3. Import users into Auth0
4. Update your CMS configuration

### Option 2: Migrate to GitHub OAuth
1. Install GitHub OAuth as described above
2. Users will need GitHub accounts
3. Update your CMS configuration
4. Remove Netlify Identity widget scripts
5. Existing users login with their GitHub accounts (no password migration needed)

## Resources

- [Decap CMS Documentation](https://decapcms.org/docs/)
- [Decap CMS Authentication Backends](https://decapcms.org/docs/authentication-backends/)
- [GitHub OAuth Backend](https://decapcms.org/docs/github-backend/)
- [Netlify's Auth0 Extension Announcement](https://www.netlify.com/blog/auth0-extension-identity-changes/)
- [Configuration Options](https://decapcms.org/docs/configuration-options/)
- [Widget Reference](https://decapcms.org/docs/widgets/)

## Recommended Setup for Your Project

Based on your needs, here's our recommendation:

**For Small Team (1-3 people):**
- ✅ **Use GitHub OAuth** - Simple, free, and reliable
- All team members need GitHub accounts with write access to the repo

**For Larger Team or Non-Technical Users:**
- ✅ **Use Auth0** - More user-friendly, better security features
- Supports multiple authentication methods
- Better user management

**Avoid:**
- ❌ **Netlify Identity** - Deprecated, no support for new issues

## Notes

- Decap CMS creates commits on your behalf when you publish content
- All changes go through Git, maintaining full version control
- The CMS is served as a static React app from `/admin/`
- Content is stored in the repository, not in a database
- GitHub OAuth is the simplest modern option and requires no additional services
- Auth0 provides more features but requires additional configuration
