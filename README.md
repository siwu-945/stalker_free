# Stalker Free 👥

Fun little script I used when I found out Instgram doesn't provide an api for you to get access to the lists of people who followed you. This script allows you to track who unfollowed you on Instagram. But you first need to have a copy of what previous followers and followers now. So better start keeping track!

## Creedits
https://stackoverflow.com/questions/32407851/instagram-api-how-can-i-retrieve-the-list-of-people-a-user-is-following-on-ins

## Features ✨

- Download your current Instagram followers to a CSV file
- Compare two follower lists to identify unfollowers
- No API keys required
- Works directly in your browser

## How It Works 🔍

This tool consists of two parts:
1. A browser script to download your current followers
2. A bash script to compare follower lists

## Prerequisites 📋

- Access to Instagram via web browser (Chrome recommended)
- Basic knowledge of using browser console
- Bash terminal (for comparing files)

## Usage 🚀

### Step 1: Download Your Current Followers

1. Log in to Instagram on your web browser
2. Open Developer Tools (Press F12 or right-click and select "Inspect")
3. Click on "Console" tab
4. Copy and paste the script called "scrape.js":
5. Remeber to replace username with your own user name

```javascript
const username = "YOUR_USER_NAME";

const today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0');
...
```

### Step 2: Compare 

1. Save the missingFollower.sh somewhere in your local foloder
2. In command line:
    - Make the script executable:
    ```bash
    chmod +x missingFollower.sh
    ```
3. Run the comparison:
```bash
./missingFollower.sh old_followers.csv new_followers.csv
```

## Contributing 🤝

While the manual approach works, a more sophisticated solution would be to build an automated system using Puppeteer to simulate browser interactions with Instagram. This system could:
- Automatically log in to Instagram
- Periodically fetch follower data
- Store follower information in a database
- Run scheduled comparisons
- Send notifications when followers change

However, this approach faces significant challenges:
1. Instagram has CAPTCHA verification
2. Risk of account flagging or suspension
3. Complex session management requirements

While there are some hack around this using browser session cookies... but do we really need to go that far?

## Disclaimer ⚖️

- This tool is not affiliated with, authorized, maintained, sponsored or endorsed by Instagram or any of its affiliates or subsidiaries. Use at your own risk.
- This tool is meant for learning and understanding web DOM concepts
- Not intended for actual Instagram data collection
- Will be promptly removed if it conflicts with Instagram's terms of service
- Users should always respect platform policies and user privacy
