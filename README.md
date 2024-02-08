# MySql-gs
Connect your MySql database with Google Sheets.

Create a copy of this sample file:

 - [MySql to Google Sheets](https://docs.google.com/spreadsheets/d/1h_XtVjxl0Kf90cIDjzoz_4gWBiSUOX-yUvTJiKGvoEI/copy)

Source code is here:

 - [`118KocmYPQgb_4oFjUk4Be1Is9Yr2aqHfi74VZw_KZO5zXzETOOoPhtQk`](https://script.google.com/u/0/home/projects/118KocmYPQgb_4oFjUk4Be1Is9Yr2aqHfi74VZw_KZO5zXzETOOoPhtQk/edit)


Usage:

1. Connect. Menu:  `🛢️ MySql > ➕ Connect...`

2. Create new sheet

3. Write your SQL  select-statemant in cell [A1]

4. Get the data from MySql base: `🛢️ MySql > ✔️ Update active sheet`

Security note: your password and connection string are safe. The script uses `PropertiesService.getUserProperties()` to store your secret information. Your Google Account is the only place from where this information available.

![image](https://github.com/Max-Makhrov/MySql-gs/assets/19220852/d2c69497-9d4b-4e1a-b7f7-54d92103f739)


