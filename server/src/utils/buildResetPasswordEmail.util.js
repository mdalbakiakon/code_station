const buildResetPasswordEmail = (code) => {
    return `
    <!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
        @font-face {
            font-family: 'Anodina';
            src: url('https://cdn.jsdelivr.net/gh/mdalbakiakon/code_station_assets/fonts/Anodina-Regular.woff2') format('woff2');
            font-weight: 400;
            font-style: normal;
        }
    </style>
</head>
<body style="padding:0; margin:0;">

    <div style="background-color:#f4f4f7; padding:40px 0; font-family:'Anodina', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; text-align:center;">
        <div style="background-color:#ffffff; border-radius:8px; overflow:hidden; max-width:480px; margin:0 auto;">
            
            <div>
                <img src="https://cdn.jsdelivr.net/gh/mdalbakiakon/code_station_assets/images/logo.png" alt="Code Station" 
                     style="width:100%; height:120px; object-fit:cover; object-position:center; display:block; margin:0; border:none;" />
            </div>

            <div style="padding:32px;">
                <p style="color:#333333; font-size:16px; margin:0 0 16px 0;">
                    Please use the verification code below to reset your password:
                </p>

                <div style="font-size:32px; font-weight:bold; letter-spacing:8px; color:#111827; background-color:#f4f4f7; padding:16px; border-radius:6px; margin:16px 0;">
                    ${code}
                </div>

                <p style="color:#888888; font-size:13px; margin:24px 0 0 0;">
                    This code expires in 10 minutes. If you didn't request this, you can safely ignore this email.
                </p>

            </div>

            
                <p style="color:#999999; font-size:12px; margin:0 0 16px 0;">
                    Copyright ${new Date().getFullYear()} © CodeStation. All rights reserved.
                </p>
            

        </div>
    </div>
</body>
</html>
    `;
}

export default buildResetPasswordEmail;