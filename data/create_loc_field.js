conn = new Mongo("localhost:27017");
db = conn.getDB("Project");

db.Routes.find().forEach(
   function (e) {
     if ('area_latitude' in e && e.area_latitude !== "")
     {
     var ll = {longitude : e.area_longitude, latitude: e.area_latitude};
     var lla =[]; 
    
     Object.keys(ll).forEach(function(key) {
     	
     	var val = ll[key];
     	
     	lla.push(val);
    
     });

     var p = "Point";
     e.loc = {type: p, coordinates: lla};     	
     
     // save the updated document
     db.Routes.save(e);
   	}
   }
 )