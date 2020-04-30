//
//  __  __                                 
// |  \/  |                                
// | \  / | ___ _ __ ___   ___  _ __ _   _ 
// | |\/| |/ _ \ '_ ` _ \ / _ \| '__| | | |
// | |  | |  __/ | | | | | (_) | |  | |_| |
// |_|  |_|\___|_| |_| |_|\___/|_|   \__, |
//                                    __/ |
//                                   |___/ 
// get the  key for storing connections
function getPropertiesMySqlKey_()
{
  const C_KEY_PREFIX = 'mySQL_'; 
  var key = C_KEY_PREFIX + SpreadsheetApp.getActive().getId();
  return key;
}
// returns string from saved propery
// returns `null` if nothing saved
function getElementFromUserMemory_(key)
{
  var props = getGoogleProperties_();
  return props.getProperty(key);
}
// separate function for ability to change method
function getGoogleProperties_()
{
  var props = PropertiesService.getUserProperties(); // change if needed
  return props;  
}
// saves string to memory
function saveElementToUserMemory_(key, value)
{
  var props = getGoogleProperties_();
  props.setProperty(key, value);  
}


//  ______                   
// |  ____|                  
// | |__ ___  _ __ _ __ ___  
// |  __/ _ \| '__| '_ ` _ \ 
// | | | (_) | |  | | | | | |
// |_|  \___/|_|  |_| |_| |_|
//                                                     
// show the form
function setMySqlConnection_()
{
  showConnectionForm_();  
}
function showConnectionForm_()
{
  var html = HtmlService.createTemplateFromFile('ConnectionsForm').evaluate().setWidth(450).setHeight(400);  
  SpreadsheetApp.getUi().showModalDialog(html, 'Set Connection');     
}
// function used from userform to collect data
function getMainMySqlData()
{
  var data; // get connection elements from user memory
  var savedProp = getElementFromUserMemory_(getPropertiesMySqlKey_());
  if (savedProp)
  {
    data = JSON.parse(savedProp);    
  }
  return data;  
}
// function runs on form submit
function getMySqlConnectionResponse(data)
{
  // test connection
  try
  {
    var conn = getDBConnection_(data);
    conn.close();
    Browser.msgBox('Success!');
  }
  catch(error)
  {
    Browser.msgBox(error + '\\n\\nPlease try again.');
    setMySqlConnection_();
    return -1;
  }
  
  // save data to memory
  saveElementToUserMemory_(getPropertiesMySqlKey_(), JSON.stringify(data));
  return 0;
}

// get connection data
function getMySqlConnectionData_()
{
  // get from memory
  data = getMainMySqlData();
  if (data) { return data; }
  // use form
  setMySqlConnection_();
  return getMainMySqlData();  
}