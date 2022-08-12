# MySql-gs
Connect your MySql database with Google Sheets.

Create a copy of this sample file:

 - [MySql to Google Sheets](https://docs.google.com/spreadsheets/d/1h_XtVjxl0Kf90cIDjzoz_4gWBiSUOX-yUvTJiKGvoEI/copy)


Usage:

1. Connect. Menu:  `🛢️ MySql > ➕ Connect...`

2. Create new sheet

3. Write your SQL  select-statemant in cell [A1]

4. Get the data from MySql base: `🛢️ MySql > ✔️ Update active sheet`

Security note: your password and connection string are safe. The script uses `PropertiesService.getUserProperties()` to store your secret information. Your Google Account is the only place from where this information available.
