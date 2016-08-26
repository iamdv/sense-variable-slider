define( [
    "qlik", 
    "jquery",
    "css!./Variable-Input.css",
    "css!./jquery-ui.css",
	"https://code.jquery.com/ui/1.12.0/jquery-ui.js",
	"https://code.jquery.com/jquery-1.12.4.js"
    // "./js/myCode"
],
/**
* @owner Deepak Vadithala (AKA: DV), @dvadithala */

function (qlik, $, cssContent, jqueryCSS, jqueryUICDN, jqueryCDN) {

var app = qlik.currApp(this);
var myCodeExecCounter = 1;

var myCustomObj = {
	myObjSliderSingleRangeRadioButton: {
		component:"radiobuttons",
		ref:"props.myCustomObj.myObjSliderSingleRangeRadioButton",
		label:"Select One",
		type:"string",
		options:[{value:'single', label:"Single"}, {value:'range', label:"Range"}]
	},	
	myObjVariableName: {
		ref:"props.myCustomObj.myObjVariableName",
		label:"Variable Name",
		type:"string"
		// expression:"optional"
	},
	myObjVariableMinValue: {
		ref:"props.myCustomObj.myObjVariableMinValue",
		label:"Variable Min Value",
		type:"integer",
		expression:"optional"
	},	
	myObjVariableMaxValue: {
		ref:"props.myCustomObj.myObjVariableMaxValue",
		label:"Variable Max Value",
		type:"integer",
		expression:"optional"
	},	
	myObjVariableStepValue: {
		ref:"props.myCustomObj.myObjVariableStepValue",
		label:"Variable Step Value",
		type:"integer",
		expression:"optional"
	},	
	myObjVariableDefaultStartMinValue: {
		ref:"props.myCustomObj.myObjVariableDefaultStartMinValue",
		label:"Default Start Min Value (Only for Range)",
		type:"integer",
		expression:"optional"
	},	
	myObjVariableDefaultStartMaxValue: {
		ref:"props.myCustomObj.myObjVariableDefaultStartMaxValue",
		label:"Default Start Max Value (Only for Range)",
		type:"integer",
		expression:"optional"
	},	
	myObjSwitchLabel: {
		type: "boolean",
		component: "switch",
		label: "Switch On Label",
		ref: "props.myCustomObj.myObjSwitchLabel",
		options: [{value: true, label: "On"}, {value: false, label: "Not On"}],
		defaultValue: true
	},	
	myObjSwitchLabelValue: {
		ref:"props.myCustomObj.myObjSwitchLabelValue",
		label:"Variable Label Text",
		type:"string",
		expression:"optional"
	},	
	myObjSwitchLabelBold: {
		ref:"props.myCustomObj.myObjSwitchLabelBold",
		component:"checkbox",
		label:"Bold"
	},
	myObjSwitchLabelItalic: {
		ref:"props.myCustomObj.myObjSwitchLabelItalic",
		component:"checkbox",
		label:"Italic"
	},	
	myObjSliderThemeDropdown: {
		component:"dropdown",
		ref:"props.myCustomObj.myObjSliderThemeDropdown",
		label:"Select One",
		type:"string",
		options:[{value:'default', label:"Default"}, {value:'qliker', label:"Qliker"}, {value:'dark-knight', label:"Dark Knight"}, {value:'simple', label:"Simple"}]
	}
};


var myAppearenceSection = {
	uses:"settings",
	items: {
		myListItems: {
			label: "Variable Properties",
			items: {
				myObjVariableName: myCustomObj.myObjVariableName,
				myObjSliderSingleRangeRadioButton: myCustomObj.myObjSliderSingleRangeRadioButton,
				myObjVariableMinValue: myCustomObj.myObjVariableMinValue,		
				myObjVariableMaxValue: myCustomObj.myObjVariableMaxValue,
				myObjVariableStepValue: myCustomObj.myObjVariableStepValue,	
				myObjVariableDefaultStartMinValue: myCustomObj.myObjVariableDefaultStartMinValue,		
				myObjVariableDefaultStartMaxValue: myCustomObj.myObjVariableDefaultStartMaxValue,				
				myObjSwitchLabel: myCustomObj.myObjSwitchLabel,
				myObjSwitchLabelValue: myCustomObj.myObjSwitchLabelValue,
				myObjSwitchLabelBold: myCustomObj.myObjSwitchLabelBold,
				myObjSwitchLabelItalic: myCustomObj.myObjSwitchLabelItalic,
				myObjSliderThemeDropdown: myCustomObj.myObjSliderThemeDropdown				
			}			
		}		
	}
};

	return {
		definition:{
			type: "items",
			component:"accordion",
			items:{
				appearance: myAppearenceSection
			}
		},
		paint: function ($element, layout) {

			var mySliderObjProps = {
				min: layout.props.myCustomObj.myObjVariableMinValue, //Object Prop contains Variable Min Value
				max: layout.props.myCustomObj.myObjVariableMaxValue, //Object Prop contains Variable Max Value
				step: layout.props.myCustomObj.myObjVariableStepValue, //Object Prop contains Variable Step Value
				singleRange: layout.props.myCustomObj.myObjSliderSingleRangeRadioButton, //Object Prop contains whether it is Single or Range of values				
				defaultMin: layout.props.myCustomObj.myObjVariableDefaultStartMinValue, //Object Prop contains Variable Min Value
				defaultMax: layout.props.myCustomObj.myObjVariableDefaultStartMaxValue, //Object Prop contains Variable Max Value				
				showlabel: layout.props.myCustomObj.myObjSwitchLabel, //Object Prop contains boolean which determines where label should be shown/hidden
				label: layout.props.myCustomObj.myObjSwitchLabelValue, //Object Prop contains label text will only be rendered if the above value is true
				bold: layout.props.myCustomObj.myObjSwitchLabelBold, //Object Prop contains boolean value (checkbox) for bold formatting
				italic: layout.props.myCustomObj.myObjSwitchLabelItalic, //Object Prop contains boolean value (checkbox) for bold formatting
				theme: layout.props.myCustomObj.myObjSliderThemeDropdown, //Object Prop contains boolean value (checkbox) for bold formatting								
			};		

			var myDevMessage = '############# Hi there, this extension has been built by Deepak Vadithala. Follow me @dvadithala #############';


			if(mySliderObjProps.singleRange === 'single'){
	 			var myHTML = '<input type="hidden" id="myIdInputVariableValue" class="text"> <div class="slider-wrapper"> <div class="slider-label"> <label>' 
	 					+ ( mySliderObjProps.bold ? '<b>' : '')  +  ( mySliderObjProps.italic ? '<i>' : '')
		            	+ ( mySliderObjProps.showlabel ? mySliderObjProps.label : '') 
		            	+ ( mySliderObjProps.bold ? '</b>' : '') +  ( mySliderObjProps.italic ? '</i>' : '')
		            	+ '</label></div> <div class="slider-object"><input type="range" id="myIdInputSliderObj" class="' + mySliderObjProps.theme + '" min="' 
		            	+ mySliderObjProps.min + '" max="' + mySliderObjProps.max + '" step="' + mySliderObjProps.step + '" "> </div> </div>';	
			} else if(mySliderObjProps.singleRange === 'range'){
	   			var myHTML = '<p> <label for="myIdSliderDualValue">' + ( !mySliderObjProps.showlabel ? '' : 'Variable Value: ') +  ' </label> '
	   					+ '<input type="text" id="myIdSliderDualValue" readonly style="border:0; color:#f6931f; font-weight:bold;"> </p>'
	   					+ '<div id="myIdDivSliderDual"></div>';
			}


			$element.html(myHTML);

			var myVariablesArr= [layout.props.myCustomObj.myObjVariableName, layout.props.myCustomObj.myObjVariableValue];

			app.variable.setNumValue(myVariablesArr[0], myVariablesArr[1]);

			/* ==========================================================*/
			/* This code gets executed when the SINGLE slider object is changed */
			if(mySliderObjProps.singleRange === 'single' || myCodeExecCounter === 1){
				$('#myIdInputSliderObj').on('change', function(){
				    console.log($('#myIdInputVariableValue').val());
				    $('#myIdInputVariableValue').val($('#myIdInputSliderObj').val());
				    app.variable.setNumValue(myVariablesArr[0], Number($('#myIdInputVariableValue').val()));
				});
			}
			/* ==========================================================*/

			/* ==========================================================*/
			/* This code gets executed when the DUAL slider object is changed */
			if ( mySliderObjProps.singleRange === 'range' ){
				$( "#myIdDivSliderDual" ).slider({
					range: true,
					min: mySliderObjProps.min,
					max: mySliderObjProps.max,
					step: mySliderObjProps.step,
					values: [ mySliderObjProps.defaultMin, mySliderObjProps.defaultMax ],
				slide: function( event, ui ) {
					$( "#myIdSliderDualValue" ).val( "Min: " + ui.values[ 0 ] + " - Max: " + ui.values[ 1 ] );
					app.variable.setStringValue(myVariablesArr[0], String(ui.values[ 0 ] + '|' + ui.values[ 1 ]) );
					}
				});
				if ( mySliderObjProps.showlabel){
					$( "#myIdSliderDualValue" ).val( "Min: " + $( "#myIdDivSliderDual" ).slider( "values", 0 ) +
						" - Max:" + $( "#myIdDivSliderDual" ).slider( "values", 1 ) );
				}
			}
			/* ==========================================================*/			
			console.log('myCodeExecCounter: '+ myCodeExecCounter);
			myCodeExecCounter = myCodeExecCounter + 1;
		}
	};

} );
