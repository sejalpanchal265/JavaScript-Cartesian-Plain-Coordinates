var jsonContent = [];


var originPoint=[];

//load the 
$("#sortBtn").click(
	function(){
		originPoint[0]=(parseInt($("#OriginX").val()));
		originPoint[1]=(parseInt($("#OriginY").val()));

		$.ajax({
		  type: 'GET',
		  url: 'coordinates.json',
		  beforeSend: function(xhr){
			if (xhr.overrideMimeType)
			{
			xhr.overrideMimeType("application/json");
			}
		  },
		  dataType: 'json',
		  success: function(data) { 
			jsonContent = data;
			
			$.each(jsonContent,function(index, value){
				jsonContent[index].distanceFromOrigin=getDistanceFromOrigin(value.value);
			});
			
			sortedJsonContent = sort(jsonContent);

			$.each(sortedJsonContent,function(index, value){
				$("#result").append((index+1)+". "+value.id+" - "+value.value+". Distance: "+value.distanceFromOrigin+"<br/>");
			});
		  }
		});
		
	}
);

//Pythagorean distance
function getDistanceFromOrigin(point){


	var Point = point.split(',');

	var x = parseInt(Point[0]);
	var y = parseInt(Point[1]);

	// sqrt( (x1-x2)^2 * (y1-y2)^2 )
	return parseInt(Math.sqrt( (originPoint[0]-x)*(originPoint[0]-x) + (originPoint[1]-y)*(originPoint[1]-y) ));
}


//MergeSort list implementation
var sort = function(array) {
  var length = array.length;
  if(length == 1) { 
    return array;
  }
  var center = Math.floor(length/2);
  return merge(sort(array.slice(0,center)), sort(array.slice(center)));
};

var merge = function(leftHalf, rightHalf) {
  var result = [];
  while((leftHalf.length > 0) && (rightHalf.length > 0)) {
    if(leftHalf[0].distanceFromOrigin < rightHalf[0].distanceFromOrigin)
      result.push(leftHalf.shift());
    else
      result.push(rightHalf.shift());
  }

  result = result.concat(leftHalf, rightHalf);
  return result;
};
