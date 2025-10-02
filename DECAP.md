# Decap CMS Setup Instructions

Decap CMS (formerly Netlify CMS) is a Git-based content management system that allows you to manage content directly from your deployed website.

## Prerequisites

- A GitHub account with access to the repository
- The site deployed on Netlify
- Netlify Identity enabled on your site

## Step 1: Enable Netlify Identity

1. Go to your Netlify dashboard
2. Navigate to **Site Settings** → **Identity**
3. Click **Enable Identity**
4. Under **Registration preferences**, select:
   - **Invite only** (recommended for security)
   - Or **Open** if you want anyone to register

## Step 2: Enable Git Gateway

1. In the same Identity settings page
2. Scroll to **Services** → **Git Gateway**
3. Click **Enable Git Gateway**
4. This allows Decap CMS to authenticate with GitHub on behalf of users

## Step 3: Create Admin Page

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

## Step 4: Create CMS Configuration

Create a new file at `public/admin/config.yml`:

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

## Step 5: Add Netlify Identity Widget to Your Site

Add the Netlify Identity widget script to your main layout file (e.g., `src/layouts/PageLayout.astro` or `src/layouts/BaseLayout.astro`):

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

## Step 6: Deploy Your Changes

1. Commit and push your changes:
   ```bash
   git add public/admin/
   git commit -m "Add Decap CMS configuration"
   git push
   ```

2. Wait for Netlify to deploy

## Step 7: Create Your First User

1. Go to your Netlify dashboard
2. Navigate to **Identity** tab
3. Click **Invite users**
4. Enter your email address
5. Check your email and click the invitation link
6. Set your password

## Step 8: Access the CMS

1. Navigate to `https://your-site.netlify.app/admin/`
2. Click **Login with Netlify Identity**
3. Enter your credentials
4. You should now see the Decap CMS dashboard!

## Troubleshooting

### "Cannot read property 'on' of undefined"
- Make sure the Netlify Identity widget script is loaded before your custom script

### "Error loading config.yml"
- Check that `public/admin/config.yml` exists and has valid YAML syntax
- Verify the file is being deployed (check in `dist/admin/config.yml` after build)

### "Authentication failed"
- Verify Git Gateway is enabled in Netlify
- Check that you're logged into Netlify Identity
- Try clearing your browser cache and cookies

### Images not uploading
- Verify the `media_folder` path exists: `src/assets/images`
- Check repository permissions in GitHub
- Ensure Git Gateway has write access

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

1. **Keep registration "Invite only"** in Netlify Identity settings
2. **Enable 2FA** for your Netlify account
3. **Regularly review** Identity users and remove inactive accounts
4. **Use role-based access** if you have multiple content editors
5. **Monitor** the Git activity from Decap CMS commits

## Resources

- [Decap CMS Documentation](https://decapcms.org/docs/)
- [Netlify Identity Documentation](https://docs.netlify.com/visitor-access/identity/)
- [Configuration Options](https://decapcms.org/docs/configuration-options/)
- [Widget Reference](https://decapcms.org/docs/widgets/)

## Notes

- Decap CMS creates commits on your behalf when you publish content
- All changes go through Git, maintaining full version control
- The CMS is served as a static React app from `/admin/`
- Content is stored in the repository, not in a database
