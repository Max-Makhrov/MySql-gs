// C O N N E C T
function getDBConnection_(data)
{
  data = data || getMySqlConnectionData_()
  // getCloudSqlConnection
  var conn = Jdbc.getConnection('jdbc:mysql://' + data.host + ':3306/' + data.database + '?characterEncoding=UTF-8', data.username, data.password);  
                             //  dbName?characterEncoding=UTF-8
                             //  jdbc:mysql://yoursqlserver.example.com:3306/database_name
  return conn;  
}


// S E L E C T
function test_writeSqlToSheet_()
{
  var t = new Date();
  // ge data 
  var file = SpreadsheetApp.getActive();
  var sheet = file.getActiveSheet();
  var sql = sheet.getRange(1, 1).getValue();  
  var data = getSelectAsTable_(sql);
  if (!data)
  {
    Browser.msgBox('No data found by your request =(.\\n\\nPlease try changing SQL-request in cell A1');
    return -1;
  }  
  // clear old data
  sheet.getRange(2, 1, sheet.getLastRow(), data[0].length).clearContent();
  // paste new data
  writeDataIntoSheet_(false, sheet, data, 2);
  Browser.msgBox('Done!\\n\\nThe time spent = ' + getTimeEllapse_(t));
  return 0;
}
function test_getSelectAsTable()
{
  var t = new Date();
  // ↓ sample select requests
  var sql = 'SELECT * FROM mysql.user;';
  var sql = "select * from sys.schema_unused_indexes;"; // unused indexes
  var sql = "SELECT @@character_set_database, @@collation_database;";
  var sql = "select * from information_schema.SCHEMATA where SCHEMA_NAME = 'mysql';";
  // exclude sql headers
  var noHeaders = true;
  Logger.log(getSelectAsTable_(sql, noHeaders));    
  Logger.log('Time to get select = ' + (new Date() - t));
}
var C_TYPES_FUNCTIONS = 
    {
      'INT UNSIGNED':      'getLong', 
      'INT':               'getLong',
      'VARCHAR':           'getString',
      'DECIMAL':           'getDouble',
      'DATETIME':          'getString',
      'BIGINT UNSIGNED':   'getLong',
      'BIGINT':            'getLong',
      'DATE':              'getString',
      'CHAR':              'getString',
      'BLOB':              'getString',
      'TIMESTAMP':         'getString',
      'SMALLINT UNSIGNED': 'getLong',
      'TINYINT':           'getLong',
      'FLOAT':             'getDouble',
      'DOUBLE':            'getDouble',
      'MEDIUMBLOB':        'getString'
    };
function getSelectAsTable_(sql, noHeaders)
{  
  if (!sql) { return -1; }
  var dbConn = getDBConnection_();
  var stmt = dbConn.createStatement();
  try
  {
    var results = stmt.executeQuery(sql);
  }
  catch(e)
  {
    throw 'Error in SQL text = ' + sql + '. ' + e;
  }   
  var result = convertSqlResultsToTable_(results, noHeaders);
  dbConn.close(); 
  return result; 
}
function convertSqlResultsToTable_(sqlResults, noHeaders)
{
  var results = sqlResults;
  var metaData=results.getMetaData();  
  var numCols = metaData.getColumnCount();   
  // get types
  var types = [];
  for (var i = 0; i < numCols; i++)
  {
    types.push(metaData.getColumnTypeName(i + 1));  
  }    
  var head=[];
  // headers  
  for (var col = 0; col < numCols; col++) {
    head.push(metaData.getColumnName(col + 1));
  }  
  // data
  var result = [head], type = '', res = '';
  if (noHeaders) { result = []; };
  while (results.next()) {
    var row = [];    
    for (var col = 0; col < numCols; col++) {
      type = types[col];
      try {
        res = results[C_TYPES_FUNCTIONS[type]](col + 1);
        if (results.wasNull()) { res = ''; } // return '' = empty in case of null
        // 2018-10-01 17:34:12.0 → 2018-10-01 17:34:12
        if (['DATETIME'].indexOf(type) > -1) { res = res.replace(/\.\d+$/, ''); } 
        row.push(res);
      }
      catch(e)
      {
       throw 'Not defined type = ' + type + ' in C_TYPES_FUNCTIONS'; 
      }
    }
    result.push(row) 
  }
  return result;     
}


// U P D A T E
function test_update()
{
  // samle update request
  var sql = "update T_TASKS tt set tt.feedback = '👍👍👍' where tt.j_tsk_id = 100500";
  runCustomUpdate_(sql);  
}
function runCustomUpdate_(sql)
{
  if (sql === '') { return -1; } // nothing to update  
  /*
  // test: write data to document on drive (for big SQL text)
  var fileName = "Test Doc " + new Date().toString() + '.txt';//Create a new file name with date on end
  var content = sql;
  var folder = DriveApp.getFolderById('1pStAe3gzQpZhiUUbsXR0AF065yHfr3gK'); // https://drive.google.com/drive/folders/1pStAe3gzQpZhiUUbsXR0AF065yHfr3gK
  var newFile = folder.createFile(fileName,content);
  */  
  var dbConn = getDBConnection_();
  var stmt = dbConn.createStatement();
  Logger.log(sql)
  var results = stmt.executeUpdate(sql);
  dbConn.close(); 
  return results; 
}


