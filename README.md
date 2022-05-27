# net-core-projects
# .NET 6.0 - Boilerplate API Tutorial with Email Sign Up, Verification, Authentication & Forgot Password

The boilerplate API allows you to register a user account, login and perform different actions based on your role. The Admin role has full access to manage (add/edit/delete) any account in the system, the User role has access to update/delete their own account. The first account registered is automatically assigned the Admin role and subsequent registrations are assigned the User role.

On registration the API sends a verification email with a token and instructions to the account email address, accounts must be verified before they can authenticate. SMTP settings for email are configured in appsettings.json.

**TO DO:
- Before running the app, first consider to configure SMTP in the appsettings.json.

***New Features:
- Send Email Warning when an user tries to login in unknown devices. Only when user verify using email does the app allows you to login. 
- Admin can also change time-alive of token.
