var fs= require("fs");
var HashMap= require('hashmap');

var writerStream0 = fs.createWriteStream('myJsProduction1.json',{
  flags: "a",
  encoding: "UTF8",
  mode: 0744
});
var writerStream1 = fs.createWriteStream('myJsProduction2.json',{
  flags: "a",
  encoding: "UTF8",
  mode: 0744
});
var writerStream2 = fs.createWriteStream('myJsProduction3.json',{
  flags: "a",
  encoding: "UTF8",
  mode: 0744
});
var writerStream3 = fs.createWriteStream('myJsProduction4.json',{
  flags: "a",
  encoding: "UTF8",
  mode: 0744
});


var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('Agriculture and Cooperation.csv')
});
var x=0;
var header;
var elements;
var flag=0;
var xxx=0;
var headerMap=new HashMap();

//1. oilseeds
var oilseedsMap=new HashMap();
var foodgrainsMap=new HashMap();
var oilseedsSet= new Set();
var foodgrainsSet=new Set();

oilseedsSet.add("Agricultural Production Oilseeds Kharif");
oilseedsSet.add("Agricultural Production Oilseeds Rabi");
oilseedsSet.add("Agricultural Production Oilseeds Groundnut");
oilseedsSet.add("Agricultural Production Oilseeds Groundnut Kharif");
oilseedsSet.add("Agricultural Production Oilseeds Groundnut Rabi");
oilseedsSet.add("Agricultural Production Oilseeds Castorseed Kharif");
oilseedsSet.add("Agricultural Production Oilseeds Sesamun Kharif");
oilseedsSet.add("Agricultural Production Oilseeds Nigerseed Kharif");
oilseedsSet.add("Agricultural Production Oilseeds Rapeseed and Mustard Rabi");
oilseedsSet.add("Agricultural Production Oilseeds Linseed Rabi");
oilseedsSet.add("Agricultural Production Oilseeds Safflower Rabi");
oilseedsSet.add("Agricultural Production Oilseeds Sunflower");
oilseedsSet.add("Agricultural Production Oilseeds Sunflower Kharif");
oilseedsSet.add("Agricultural Production Oilseeds Sunflower Rabi");

foodgrainsSet.add("Agricultural Production Foodgrains Kharif");
foodgrainsSet.add("Agricultural Production Foodgrains Rabi");
foodgrainsSet.add("Agricultural Production Foodgrains Rice");
foodgrainsSet.add("Agricultural Production Foodgrains Rice Kharif");
foodgrainsSet.add("Agricultural Production Foodgrains Rice Rabi");
foodgrainsSet.add("Agricultural Production Foodgrains Wheat Rabi");
foodgrainsSet.add("Agricultural Production Foodgrains Jowar");
foodgrainsSet.add("Agricultural Production Foodgrains Jowar Kharif");
foodgrainsSet.add("Agricultural Production Foodgrains Jowar Rabi");
foodgrainsSet.add("Agricultural Production Foodgrains Bajra Kharif");
foodgrainsSet.add("Agricultural Production Foodgrains Maize");
foodgrainsSet.add("Agricultural Production Foodgrains Maize Kharif");
foodgrainsSet.add("Agricultural Production Foodgrains Maize Rabi");
foodgrainsSet.add("Agricultural Production Foodgrains Ragi Kharif");
foodgrainsSet.add("Agricultural Production Foodgrains Small Millets Kharif");
foodgrainsSet.add("Agricultural Production Foodgrains Barley Rabi");
foodgrainsSet.add("Agricultural Production Foodgrains Coarse Cereals");
foodgrainsSet.add("Agricultural Production Foodgrains Coarse Cereals Kharif");
foodgrainsSet.add("Agricultural Production Foodgrains Coarse Cereals Rabi");
foodgrainsSet.add("Agricultural Production Foodgrains Cereals");
foodgrainsSet.add("Agricultural Production Foodgrains Cereals Kharif");
foodgrainsSet.add("Agricultural Production Foodgrains Cereals Rabi");
foodgrainsSet.add("Agricultural Production Foodgrains Tur Kharif");
foodgrainsSet.add("Agricultural Production Foodgrains Other Kharif Pulses Kharif");
foodgrainsSet.add("Agricultural Production Foodgrains Gram Rabi");
foodgrainsSet.add("Agricultural Production Foodgrains Other Kharif Pulses Rabi");
foodgrainsSet.add("Agricultural Production Foodgrains Pulses");
foodgrainsSet.add("Agricultural Production Foodgrains Pulses Kharif");
foodgrainsSet.add("Agricultural Production Foodgrains Pulses Rabi");


//2.Commercial Crops
var yearTotal=new HashMap();
for(xxx=1993;xxx<2015;xxx++)
{
  yearTotal.set(" 3-"+xxx, 0);
}
//3.South
var southStateRice=new HashMap();

function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
}

lineReader.on('line', function (line) {

  var data=new Array();
  if(x==1)
  {
    //model the data
    elements=line.split(',');

    for(each=0,d=0;each<header.length;each++,d++)
    {
      s='';
      if(elements[d].charAt(0)=='\"')
      {
        if(elements[d].charAt(elements[d].length-1)=='\"'&&elements[d].length!=1)
        {
          elements[d]=elements[d].slice(1,elements[d].length-1);
        }
        else
        {
          s=elements[d].slice(1,elements[d].length)+',';
          d++;
          while(!(elements[d].charAt(elements[d].length-1)=='\"'))
          {
            s+=elements[d]+',';
            d++;
          }
          s+=elements[d].slice(0,elements[d].length-1);
          elements[d]=s;
        }
      }
      data[each]=elements[d];
    }
    //1.oilseeds

    if(oilseedsSet.has(data[headerMap.get("Particulars")]))
    {
      oilseedsMap.set(data[headerMap.get("Particulars")], data[headerMap.get(" 3-2013")]);
    }
    else if(foodgrainsSet.has(data[headerMap.get("Particulars")]))
    {
      foodgrainsMap.set(data[headerMap.get("Particulars")], data[headerMap.get(" 3-2013")]);
    }

    //2.
    var year;
    if(data[headerMap.get("Particulars")].includes("Commercial Crops"))
    {
      for(xxx=0;xxx<header.length;xxx++)
      {
        if(yearTotal.has(header[xxx]))
        {
          if(data[headerMap.get(header[xxx])] === "NA")
          {

          }
          else
          {
            yearTotal.set(header[xxx], yearTotal.get(header[xxx])+Number(data[headerMap.get(header[xxx])]));
          }
        }
      }
    }

    //3.
    var tot=0;
    if(data[headerMap.get("Particulars")].includes("Rice Volume Andhra Pradesh"))
    {
      tot=0;
      for(xxx=0;xxx<header.length;xxx++)
      {

        if(isNumeric(data[xxx]))
          {
            tot+=Number(data[xxx]);
          }
      }
      southStateRice.set(data[headerMap.get("Particulars")],tot);
    }
    if(data[headerMap.get("Particulars")].includes("Rice Volume Tamil Nadu"))
    {
      tot=0;
      for(xxx=0;xxx<header.length;xxx++)
      {
        if(isNumeric(data[xxx]))
        {
          tot+=Number(data[xxx]);
        }
      }
      southStateRice.set(data[headerMap.get("Particulars")],tot);
    }
    if(data[headerMap.get("Particulars")].includes("Rice Volume Karnataka"))
    {
      tot=0;
      for(xxx=0;xxx<header.length;xxx++)
      {
          if(isNumeric(data[xxx]))
        {
          tot+=Number(data[xxx]);
        }
      }
      southStateRice.set(data[headerMap.get("Particulars")],tot);
    }
    if(data[headerMap.get("Particulars")].includes("Rice Volume Kerala"))
    {
      tot=0;
      for(xxx=0;xxx<header.length;xxx++)
      {
          if(isNumeric(data[xxx]))
        {
          tot+=Number(data[xxx]);
        }
      }
      southStateRice.set(data[headerMap.get("Particulars")],tot);
    }
  }
  else
  {
      header=line.split(",");

      for(xxx=0;xxx<header.length;xxx++)
      {
        headerMap.set(header[xxx],xxx);

      }
      x++;
  }
});


lineReader.on('close', function () {
  var obj;
  var max;
  var maxCname="";
  var arr=new Array();
  var arr1=new Array();
  for(xxx=0;xxx<oilseedsMap.count();xxx++)
  {
    obj=new Object();
    max=0;

    oilseedsMap.forEach(function (value, oilseed) {
      if(max<value)
      {

        max=value;
        maxCname=oilseed;
      }
    });
    obj.Oilseed=maxCname;
    obj.value=max;
    arr.push(obj);
    oilseedsMap.set(maxCname, 0);

  }
  writerStream0.write(JSON.stringify(arr));
  arr=new Array();
  for(xxx=0;xxx<foodgrainsMap.count();xxx++)
  {
    obj=new Object();
    max=0;
    foodgrainsMap.forEach(function (value, foodgrain) {
      if(max<value)
      {
        max=value;
        maxCname=foodgrain;
      }
    });
    obj.Foodgrain=maxCname;
    obj.value=max;
    foodgrainsMap.set(maxCname, 0);
    arr.push(obj);
  }
  writerStream1.write(JSON.stringify(arr));
  arr=new Array();
  yearTotal.forEach(function(value, year){
    obj=new Object();
    obj.year=year.split("-")[1];
    obj.value=yearTotal.get(year);
    arr.push(obj);
  });
  writerStream2.write(JSON.stringify(arr));
  arr=new Array();
  southStateRice.forEach(function(value, state){
    obj=new Object();
    elements=state.split(" ");
    obj.State=elements[elements.length-1];
    obj.Production=value;
    arr.push(obj);
  });
  writerStream3.write(JSON.stringify(arr));
  console.log("Conversion Completed.");
});
