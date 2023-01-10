//import { illness } from "./Analysis";
var min=[], max=[], in_id=[], out_id=[], namee=[], valuee=[], clicked=[], crit=[];
var age = 40 ,weig = 70000 ,heig = 170 , sex=0; //sex=0 male sex=2 female
var age_gp = ["newborn3" , "newborn14" , "newborn30" , "newborn60" , "infant6" , "infant1" , "infant2" , "child6" , "child9" , "child10" , "teen12" , "teen18" , "adult"];
var age_gp_selected_index = 12;
var age_gp_selected = "adult";
var tab_idd = "test_types_cbc";
var lab_type = "cbc";
var low_icon = "https://cdn-icons-png.flaticon.com/512/892/892624.png";
var high_icon = "https://cdn-icons-png.flaticon.com/512/892/892682.png";
var sup_low_icon = "https://www.iconsdb.com/icons/download/red/arrow-211-512.png";
var sup_high_icon = "https://www.iconsdb.com/icons/download/red/arrow-149-512.png";
var nl_icon = "https://cdn-icons-png.flaticon.com/128/6785/6785304.png";
//var clicked = new Array(mydata.length).fill(1);

//console.log(illness[0].name);
function    init() {
    for (i=0; i<mydata.length;i++) clicked[i] = 0;
}

function  gender() {

   
    var malelogo= "https://cdn-icons-png.flaticon.com/512/3001/3001764.png";
    var femalelogo = "https://cdn-icons-png.flaticon.com/512/2922/2922561.png" ;

    if (document.getElementById("gen_logo").src == malelogo) {
        window.setTimeout(function() { 
        //document.getElementById("preg").style.color = "white";
        document.getElementById("preg").disabled = false;
        document.getElementById("gender").value = "female";
        document.getElementById("gen_logo").src = femalelogo;
        document.getElementById("gen_logo").alt="female";
        
    } , 150)
       sex=2;
    }
    else {
        window.setTimeout(function() {
        //document.getElementById("preg").style.color = "transparent";
        document.getElementById("preg").disabled = true;
        document.getElementById("gender").value = "male";
        document.getElementById("gen_logo").src = malelogo;
        document.getElementById("gen_logo").alt="male";
        
    },150)   
    sex=0;  
    }
    age_calc();
    //change_table(tab_idd,lab_type);
}

function    age_calc() {
    var age_txtbox = document.getElementById("age");
    var age_select = document.getElementById("age_unit");
    var inp = Number(age_txtbox.value);
    var age_unit = age_select.value;
    if (inp<0) {
        age_txtbox.value = 0;
        inp=0;
    }
    if (age_unit == "day") {
        if (inp>60) {
            age_txtbox.value = 60;
            inp=60;   
        }
        if (inp<=3) {
            age_gp_selected_index = 0;
        } else if (inp<=14) {
            age_gp_selected_index = 1;
        } else if (inp<=30) {
            age_gp_selected_index = 2;
        } else {
            age_gp_selected_index = 3;
        }
    }
    if (age_unit == "mon") {
        if (inp<1) inp=1;
        if (inp>24) {
            age_txtbox.value = 24;
            inp=24;   
        }
        if (inp<=6) {
            age_gp_selected_index = 4;
        } else if (inp<=12) {
            age_gp_selected_index = 5;
        } else {
            age_gp_selected_index = 6;
        }
    } 
    if (age_unit == "year") {
        if (inp<1) inp=1;
        if (inp>139) {
            age_txtbox.value = 139;
            inp=139;   
        }
        if (inp<2) {
            age_gp_selected_index = 5;
        } else if (inp<3) {
            age_gp_selected_index = 6;
        } else if (inp<=6) {
            age_gp_selected_index = 7;
        } else if (inp<=9) {
            age_gp_selected_index = 8;
        } else if (inp<=10) {
            age_gp_selected_index = 9;
        } else if (inp<=12) {
            age_gp_selected_index = 10;
        } else if (inp<=18) {
            age_gp_selected_index = 11;
        } else {
            age_gp_selected_index = 12;
        }

        
    } 
    age_gp_selected = age_gp[age_gp_selected_index];
    
    //to correct crit min and max for Hb and Hct
    if(age_gp_selected_index == 0 || age_gp_selected_index == 1 || age_gp_selected_index == 2) {
        for(var j=0;j<mydata.length;j++) {
            if (mydata[j]["name"] == "Hb") {
                mydata[j]["critmin"] = 9;
                mydata[j]["critmax"] = 25;
            }
            if (mydata[j]["name"] == "Hct") {
                mydata[j]["critmin"] = 28;
                mydata[j]["critmax"] = 67;
            }
        }
    } else {
        for(var j=0;j<mydata.length;j++) {
            if (mydata[j]["name"] == "Hb") {
                mydata[j]["critmin"] = 7;
                mydata[j]["critmax"] = 18;
            }
            if (mydata[j]["name"] == "Hct") {
                mydata[j]["critmin"] = 20;
                mydata[j]["critmax"] = 55;
            }
        }
    }
    range_maker(age_gp_selected);
    
    

    for(var j=0;j<mydata.length;j++) {
        x= Number(mydata[j].value);
        
        //console.log(j + "-" + x);
       // if(id==mydata[j].input_id) {
            //try{if (x==0) document.getElementById(out_id[j]).innerHTML = "";} catch{} 
        try{
            if (x>max[j] && max[j] != 0) {
                y = x/max[j]; 
                st=" &#215 max"; 
                document.getElementById(out_id[j]+'_img').src=high_icon; 
                document.getElementById(out_id[j]+'_img').style.display ="flex";
            }
            else if (x<min[j]) {
                y= x/min[j]; 
                st=" &#215 min"; 
                document.getElementById(out_id[j]+'_img').src=low_icon; 
                document.getElementById(out_id[j]+'_img').style.display ="flex";
            }
            else {
                y=-1;  
                st="Normal"; 
                document.getElementById(out_id[j]+'_img').src=nl_icon; 
                document.getElementById(out_id[j]+'_img').style.display ="flex";
            }  
            if(x!="" && y!=-1) {mydata[j].status = y.toFixed(2) + st;}
            if(x!="" && y==-1)  {mydata[j].status = st; }
        } catch{}
        try{
            if(x>mydata[j]["critmax"] && mydata[j]["critmax"] != 0) {
                document.getElementById(out_id[j]+"_warn").style.display = "flex";
                crit[j] = 1;
            } else if(x<mydata[j]["critmin"] && x!=0){
                document.getElementById(out_id[j]+"_warn").style.display = "flex";
                crit[j] = 1;
            }
            else {
                document.getElementById(out_id[j]+"_warn").style.display = "none";
                crit[j] = 0;
            }
        } catch{}
        mydata[j].value = x;
        //console.log(out_id[j]);
        try{ document.getElementById(out_id[j]).innerHTML = mydata[j].status; 
            if (x==0) {
                document.getElementById(out_id[j]).innerHTML = "";
                document.getElementById(out_id[j]+'_img').style.display="none";
                document.getElementById(out_id[j]+"_warn").style.display = "none";
                mydata[j].status=0;
            } 
        } catch{}
           // break;
            
      //  }
    }
    change_table(tab_idd,lab_type);

}

function    range_maker(key) {
    var i = 0;
    for (var data of mydata) {
        var array =data[key].slice(1, -1).split(','); //making key an array like ["1","2"]
        min[i] = array[sex];
        max[i] = array[sex+1];
        data.min = array[sex];
        data.max = array[sex+1];
        i++;
    }
}

function    weight_calc() {
    var weight_txtbox = document.getElementById("weight");
    var weight_select = document.getElementById("weight_unit");
    var inp = Number(weight_txtbox.value);
    var weight_unit = weight_select.value;
    if (inp<0) {
        weight_txtbox.value = 0;
        inp=0;
    }
    if (weight_unit == "kg") {
        if (inp>500) {
            weight_txtbox.value = 500;
            inp=500;
        }
        weig = inp * 1000;
    }
    if (weight_unit == "gr") {
        if (inp>10000) {
            weight_txtbox.value = 10000;
            inp=10000;
        }
        weig = inp;
    }
    if (weight_unit == "lb") {
        if (inp>1000) {
            weight_txtbox.value = 1000;
            inp=1000;
        }
        weig = inp * 453.592 ;

    }
    
    bmi_calc();


}

function height_calc() {
    var height_txtbox = document.getElementById("height");
    var height_select = document.getElementById("height_unit");
    var inp = Number(height_txtbox.value);
    var height_unit = height_select.value;
    if (inp<0) {
        height_txtbox.value = 0;
        inp=0;
    }
    if (height_unit == "cm") {
        if (inp>270) {
            height_txtbox.value = 270;
            inp=270;
        }
        heig = inp;
    }
    if (height_unit == "ft") {
        
        var feet = height_txtbox.value.slice(0,1);
        var inch = height_txtbox.value.slice(1);
        if (feet <0) {
            feet = 0;
        }
        if(inch>=12) {
            inch = 11;
        }
        // if(inch = "") {
        //     inch = 0;
        // }
        if (height_txtbox.value.length == 1) {
            inch=0;
            height_txtbox.value = feet ;
        }
        else if (height_txtbox.value.length > 1) {
            height_txtbox.value = feet + inch;
        } else {
            feet = 0;
            inch = 0;
        }
        heig = feet * 30.48 + inch * 2.54 ;
        //console.log(feet+" feet and " + inch + "inches = " + heig + " cm");
        
    }
    bmi_calc();
}

function    bmi_calc() {
    if (weig<=0) weig = 0;
    if (heig!=0) { 
        var bmi = (weig/1000) / (heig/100) / (heig/100);
        //document.getElementById("bmi_val").innerHTML = bmi.toFixed(1);
    }
    if (heig ==0) {
        var bmi = (weig/1000) / (1/100) / (1/100);
        //document.getElementById("bmi_val").innerHTML = bmi.toFixed(1);
    }
}

function    tooltip() {
    var tootltip_text = document.getElementById("tooltip");
    for (const entry of mydata) {
        if (entry.name == this.id) {
            tootltip_text.innerHTML = entry.tooltip;
        }
    }
}
function    tooltip_remove() {
    var tootltip_text = document.getElementById("tooltip");
    tootltip_text.innerHTML = "";
}


function    change_table(tab_id,test_cat)  {
    var tooltip_text = document.getElementById("tooltip");
    tooltip_text.innerHTML = "";
    document.getElementById("table_shown").innerHTML ="";
    try {
        document.getElementById("searched").remove();
    }
    catch {}
    lab_type = test_cat;
    tab_idd=tab_id;
    var tab_selected = document.getElementById(tab_id);
    var tabs = document.getElementsByClassName("tab");
    for (const tab of tabs) {
        tab.style.opacity = 0.6;
        tab.style.border = "none";
        tab.style.margin = "5px";
    }
    tab_selected.style.opacity = 1;
    tab_selected.style.borderWidth = "2px";
    tab_selected.style.borderColor = "rgba(255, 255, 255, 0.164)";
    tab_selected.style.borderStyle = "solid";
    tab_selected.style.margin = "5px 3px";

    if(tab_id=='tab_search') {
        var search_val = document.getElementById(test_cat).value;
        var searched_items = document.createElement("div");
        
        //for saved search items
        searched_items.id= "searched";
        searched_items.style.color ="black";
        document.getElementById("table_shown").before(searched_items);      
        for (i=0;i<mydata.length;i++)
        {
            if (clicked[i] == 1)    {
                var entry = mydata[i];
                var new_div = document.createElement("div");
                new_div.className = "entry_box";
                new_div.style.background =entry.color;
                new_div.id = entry.name;
                new_div.onmouseover = tooltip;
                new_div.onmouseleave = tooltip_remove;
                searched_items.appendChild(new_div);
                
                var new_label = document.createElement("label");
                new_label.className = "entry_label";
                new_div.appendChild(new_label);

                var new_input = document.createElement("input");
                new_input.className = "entry_input";
                new_input.type = "number";
                new_input.name = entry.name;
                new_input.style.background = entry.color;
                if (entry.value!=0) new_input.value = entry.value;
                new_input.step = entry.step;
                new_div.appendChild(new_input);

                var new_output_frame = document.createElement("div");
                new_output_frame.className = "entry_output_frame";
                new_div.appendChild(new_output_frame);
                
                var warn_icon = document.createElement("img");
                warn_icon.className = "warning_icon";
                warn_icon.src = "https://cdn-icons-png.flaticon.com/128/595/595067.png";
                warn_icon.style.display = "none";
                new_output_frame.appendChild(warn_icon);

                var out_icon = document.createElement("img");
                out_icon.className = "status_icon";
                new_output_frame.appendChild(out_icon);

                var new_output = document.createElement("div");
                new_output.className = "entry_output_label";
                if(entry.status != 0) new_output.innerHTML = entry.status;
                new_output_frame.appendChild(new_output);

                namee[i] = entry.name;
                valuee[i] = entry.value;
                min[i] = entry.min;
                max[i] = entry.max;
                id_maker(i,entry.name);
                in_id[i] = entry.input_id;
                out_id[i] = entry.output_id;
                new_input.id = in_id[i];
                new_output.id = out_id[i];
                warn_icon.id = out_id[i] + "_warn";
                out_icon.id = out_id[i] + "_img";
                out_icon.style.display = "none";

                var min_string, max_string;   //what to write in label when it is upto or morethan
                if (min[i] == 0) { 
                    min_string = "< ";
                    max_string = max[i] + " ";
                } else if (max[i] == 0) { 
                    min_string = "> " + min[i];
                    max_string = " "; 
                } else {
                    min_string = min[i] + " - ";
                    max_string = max[i] + " ";
                }
                new_label.innerHTML = "<div style='font-size: 35px;'>" +entry.name+"</div>"  + min_string + max_string + entry.unit.toString();
                if (entry.status == 0) {
                    out_icon.style.display = "none";
                    warn_icon.style.display = "none";
                } 
                else if (entry.status.slice(-1)=='l') {
                    out_icon.style.display ="flex";
                    warn_icon.style.display ="flex";
                    out_icon.src = nl_icon;
                } else if (entry.status.slice(-1)=='x') {
                    out_icon.style.display ="flex";
                    warn_icon.style.display ="flex";
                    out_icon.src = high_icon;
                } else if (entry.status.slice(-1)=='n') {
                    out_icon.style.display ="flex";
                    warn_icon.style.display ="flex";
                    out_icon.src = low_icon;
                } 
                if (crit[i] ==1) {
                    warn_icon.style.display ="flex";
                } else {
                    warn_icon.style.display = "none";
                }
                new_input.onchange = check_range;
                new_input.onkeyup = check_range;

                var rem_button = document.createElement("img");
                rem_button.className = "rem";
                rem_button.src = "https://cdn-icons-png.flaticon.com/128/6342/6342193.png"; 
                rem_button.id = i;     
                new_div.appendChild(rem_button);
                rem_button.onclick = rem_search;

            }
        }

        //for search results
        search_val = new RegExp(document.getElementById("searchbar").value,'i');  
        for (i=0;i<mydata.length;i++)
        {
            if (document.getElementById("searchbar").value != "" && clicked[i] != 1) 
            {
                if (mydata[i]["name"].search(search_val) != -1 || mydata[i]["tooltip"].search(search_val) != -1 )    {

                    var entry = mydata[i];
                    
                    var new_div = document.createElement("div");
                    new_div.className = "entry_box";
                    new_div.style.background =entry.color;
                    new_div.id = entry.name;
                    new_div.onmouseover = tooltip;
                    new_div.onmouseleave = tooltip_remove;
                    document.getElementById("table_shown").appendChild(new_div);

                    var new_label = document.createElement("label");
                    new_label.className = "entry_label";
                    new_div.appendChild(new_label);

                    var min_string, max_string;   //what to write in label when it is upto or morethan
                if (min[i] == 0) { 
                    min_string = "< ";
                    max_string = max[i] + " ";
                } else if (max[i] == 0) { 
                    min_string = "> " + min[i];
                    max_string = " "; 
                } else {
                    min_string = min[i] + " - ";
                    max_string = max[i] + " ";
                }
                new_label.innerHTML = "<div style='font-size: 35px;'>" +entry.name+"</div>"  + min_string + max_string + entry.unit.toString();

                    var new_input = document.createElement("input");
                    new_input.type = "number"
                    new_input.className = "entry_input";
                    new_input.name = entry.name;
                    new_input.style.background = entry.color;
                    if (entry.value!=0) new_input.value = entry.value;
                    new_input.step = entry.step;
                    new_div.appendChild(new_input);

                    var new_output_frame = document.createElement("div");
                    new_output_frame.className = "entry_output_frame";
                    new_div.appendChild(new_output_frame);
                    
                    var warn_icon = document.createElement("img");
                    warn_icon.className = "warning_icon";
                    warn_icon.src = "https://cdn-icons-png.flaticon.com/128/595/595067.png";
                    warn_icon.style.display = "none";
                    new_output_frame.appendChild(warn_icon);

                    var out_icon = document.createElement("img");
                    out_icon.className = "status_icon";
                    new_output_frame.appendChild(out_icon);

                    var new_output = document.createElement("div");
                    new_output.className = "entry_output_label";
                    if(entry.status != 0) new_output.innerHTML = entry.status;
                    new_output_frame.appendChild(new_output);
                    
                    namee[i] = entry.name;
                    valuee[i] = entry.value;
                    min[i] = entry.min;
                    max[i] = entry.max;
                    id_maker(i,entry.name);
                    in_id[i] = entry.input_id;
                    out_id[i] = entry.output_id;
                    new_input.id = in_id[i];
                    new_output.id = out_id[i];
                    out_icon.id = out_id[i] + "_img";
                    warn_icon.id = out_id[i] + "_warn";
                    out_icon.style.display = "none";
                    if (entry.status == 0) {out_icon.style.display = "none";} 
                    else if (entry.status.slice(-1)=='l') {
                        out_icon.style.display ="flex";
                        out_icon.src = nl_icon;
                    } else if (entry.status.slice(-1)=='x') {
                        out_icon.style.display ="flex";
                        out_icon.src = high_icon;
                    } else if (entry.status.slice(-1)=='n') {
                        out_icon.style.display ="flex";
                        out_icon.src = low_icon;
                    } 
                    if (crit[i] ==1) {
                        warn_icon.style.display ="flex";
                    } else {
                        warn_icon.style.display = "none";
                    }
                    new_input.onchange = check_range;
                    new_input.onkeyup = check_range;
                    

                    var add_button = document.createElement("img");
                    add_button.className = "add";
                    add_button.src = "https://cdn-icons-png.flaticon.com/512/2972/2972186.png"; 
                    add_button.style.width = "34px";
                    add_button.style.height = "34px";
                    add_button.style.padding = "5px 0px";
                    add_button.style.position = "absolute";
                    add_button.style.alignSelf = "flex-start";
                    add_button.style.top = "5px";
                    add_button.style.cursor = "pointer";
                    add_button.id = i;
                    add_button.onclick = add_search;
                    console.log("id = " + add_button.id + " = clicked: " + clicked[i] + " : " + add_button.onclick.name);
                    new_div.appendChild(add_button);
                    
                    
                }
            }
        }
    }
    //for usual tabs
    if (test_cat != "searchbar") {
        for (i=0;i<mydata.length;i++)
        {
            if (mydata[i]["type"] == test_cat)    {
                var entry = mydata[i];
                var new_div = document.createElement("div");
                new_div.className = "entry_box";
                new_div.style.background =entry.color;
                new_div.id = entry.name;
                new_div.onmouseover = tooltip;
                new_div.onmouseleave = tooltip_remove;
                document.getElementById("table_shown").appendChild(new_div);

                var new_label = document.createElement("label");
                new_label.className = "entry_label";
                new_div.appendChild(new_label);

                var min_string, max_string;   //what to write in label when it is upto or morethan
                if (min[i] == 0) { 
                    min_string = "< ";
                    max_string = max[i] + " ";
                } else if (max[i] == 0) { 
                    min_string = "> " + min[i];
                    max_string = " "; 
                } else {
                    min_string = min[i] + " - ";
                    max_string = max[i] + " ";
                }
                new_label.innerHTML = "<div style='font-size: 35px;'>" +entry.name+"</div>"  + min_string + max_string + entry.unit.toString();

                var new_input = document.createElement("input");
                new_input.type = "number"
                new_input.className = "entry_input";
                new_input.name = entry.name;
                new_input.style.background = entry.color;
                if (entry.value!=0) new_input.value = entry.value;
                new_input.step = entry.step;
                new_div.appendChild(new_input);

                var new_output_frame = document.createElement("div");
                new_output_frame.className = "entry_output_frame";
                new_div.appendChild(new_output_frame);
                
                var warn_icon = document.createElement("img");
                warn_icon.className = "warning_icon";
                warn_icon.src = "https://cdn-icons-png.flaticon.com/128/595/595067.png";
                warn_icon.style.display = "none";
                new_output_frame.appendChild(warn_icon);

                var out_icon = document.createElement("img");
                out_icon.className = "status_icon";
                new_output_frame.appendChild(out_icon);

                var new_output = document.createElement("div");
                new_output.className = "entry_output_label";
                if(entry.status != 0) new_output.innerHTML = entry.status;
                new_output_frame.appendChild(new_output);

                namee[i] = entry.name;
                valuee[i] = entry.value;
                min[i] = entry.min;
                max[i] = entry.max;
                id_maker(i,entry.name);
                in_id[i] = entry.input_id;
                out_id[i] = entry.output_id;
                new_input.id = in_id[i];
                new_output.id = out_id[i];
                out_icon.id = out_id[i] + "_img";
                warn_icon.id = out_id[i] + "_warn";
                out_icon.style.display = "none";
                if (entry.status == 0) {out_icon.style.display = "none";} 
                else if (entry.status.slice(-1)=='l') {
                    out_icon.style.display ="flex";
                    out_icon.src = nl_icon;
                } else if (entry.status.slice(-1)=='x') {
                    out_icon.style.display ="flex";
                    out_icon.src = high_icon;
                } else if (entry.status.slice(-1)=='n') {
                    out_icon.style.display ="flex";
                    out_icon.src = low_icon;
                }
                if (crit[i] ==1) {
                    warn_icon.style.display ="flex";
                } else {
                    warn_icon.style.display = "none";
                }
                new_input.onchange = check_range;
                new_input.onkeyup = check_range;
            }
        }
    }
}

function  add_search() {
    id = this.id;
    clicked[id] = 1;
    change_table('tab_search','searchbar');
}

function  rem_search() {
    id = this.id;
    clicked[id] = 0;
    change_table('tab_search','searchbar');
}

function check_range() {
    x= Number(this.value);
    id= this.id;
    
    for(var j=0;j<mydata.length;j++) {

        if(id==mydata[j].input_id) {
            if (x<0) {x=0;}

            try{
                if (id == "in_Bil(D)") {
                    var bilt_val = document.getElementById(in_id[j-1]).value;
                    console.log(x , bilt_val);
                    if(x > bilt_val && bilt_val!=0) {
                        x = bilt_val;
                    }
                } else if (id == "in_Bil(T)") {
                    var bild_val = document.getElementById(in_id[j+1]).value;
                    console.log(x , bild_val);
                    if(x < bild_val) {
                        document.getElementById(in_id[j+1]).value = x;
                    }
                }
            }
            catch{}
        
                 
    
            if (x>max[j] && max[j] != 0) {
                y = x/max[j]; 
                st=" &#215 max"; 
                document.getElementById(out_id[j]+'_img').src=high_icon; 
                document.getElementById(out_id[j]+'_img').style.display ="flex";
            }
            else if (x<min[j]) {
                y= x/min[j]; 
                st=" &#215 min"; 
                document.getElementById(out_id[j]+'_img').src=low_icon; 
                document.getElementById(out_id[j]+'_img').style.display ="flex";
            }
            else {
                y=-1;  
                st="Normal"; 
                document.getElementById(out_id[j]+'_img').src=nl_icon; 
                document.getElementById(out_id[j]+'_img').style.display ="flex";
            }  
            if(x!="" && y!=-1) {mydata[j].status = y.toFixed(2) + st;}
            if(x!="" && y==-1)  {mydata[j].status = st; }
            try{
                if(x>mydata[j]["critmax"] && mydata[j]["critmax"] != 0) {
                    document.getElementById(out_id[j]+"_warn").style.display = "flex";
                    crit[j] = 1;
                } else if(x<mydata[j]["critmin"] && x!=0){
                    document.getElementById(out_id[j]+"_warn").style.display = "flex";
                    crit[j] = 1;
                }
                else {
                    document.getElementById(out_id[j]+"_warn").style.display = "none";
                    crit[j] = 0;
                }
            } catch{}
            mydata[j].value = x;
            //document.getElementById(in_id[j]).value = x;
            document.getElementById(out_id[j]).innerHTML = mydata[j].status;
            if (x==0) {
                document.getElementById(out_id[j]).innerHTML = "";
                document.getElementById(out_id[j]+'_img').style.display="none";
                document.getElementById(out_id[j]+"_warn").style.display = "none";
                mydata[j].status=0;
            } 
            break;
        }
    }
    
} 

function id_maker(i,name) {
    mydata[i].input_id= "in_" + (name).toString();
    mydata[i].output_id = "out_" + (name).toString();
}

var mydata = [{"name":"WBC","tooltip":"White Blood Cells","value":"","min":"","max":"","newborn3":"[9000,30000,9000,30000]","newborn14":"[9000,30000,9000,30000]","newborn30":"[9000,30000,9000,30000]","newborn60":"[6000,14000,6000,14000]","infant6":"[6000,14000,6000,14000]","infant1":"[6000,14000,6000,14000]","infant2":"[6000,14000,6000,14000]","child6":"[4000,12000,4000,12000]","child9":"[4000,12000,4000,12000]","child10":"[4000,10500,4000,10500]","teen12":"[4000,10500,4000,10500]","teen18":"[4000,10500,4000,10500]","adult":"[4000,10500,4000,10500]","step":"100","unit":"/&#181L","status":"0","color":"darkslateblue","type":"hemato","critmin":"2000","critmax":"30000","input_id":"","output_id":""},{"name":"RBC","tooltip":"Red Blood Cells","value":"","min":"","max":"","newborn3":"[4.1,6.7,4.1,6.7]","newborn14":"[4.1,6.7,4.1,6.7]","newborn30":"[4.1,6.7,4.1,6.7]","newborn60":"[3.8,5.4,3.8,5.4]","infant6":"[3.8,5.4,3.8,5.4]","infant1":"[3.8,5.4,3.8,5.4]","infant2":"[3.8,5.4,3.8,5.4]","child6":"[4,5.3,4,5.3]","child9":"[4,5.3,4,5.3]","child10":"[4,5.3,4,5.3]","teen12":"[4.2,5.6,4.1,5.3]","teen18":"[4.2,5.6,4.1,5.3]","adult":"[4.7,6,3.8,5.2]","step":"0.1","unit":"mil/&#181L","status":"0","color":"darkslateblue","type":"hemato","critmin":"0","critmax":"0","input_id":"","output_id":""},{"name":"Hb","tooltip":"Hemoglobin","value":"","min":"","max":"","newborn3":"[14,22,14,22]","newborn14":"[14,22,14,22]","newborn30":"[14,22,14,22]","newborn60":"[10.5,14,10.5,14]","infant6":"[10.5,14,10.5,14]","infant1":"[10.5,14,10.5,14]","infant2":"[10.5,14,10.5,14]","child6":"[11.5,14.5,11.5,14.5]","child9":"[11.5,14.5,11.5,14.5]","child10":"[11.5,14.5,11.5,14.5]","teen12":"[12.5,16.1,12.0,15]","teen18":"[12.5,16.1,12.0,15]","adult":"[13.5,17,11.4,15.1]","step":"0.1","unit":"g/dL","status":"0","color":"darkslateblue","type":"hemato","critmin":"7","critmax":"18","input_id":"","output_id":""},{"name":"Hct","tooltip":"Hematocrit","value":"","min":"","max":"","newborn3":"[42,66,42,66]","newborn14":"[42,66,42,66]","newborn30":"[42,66,42,66]","newborn60":"[32,44,32,44]","infant6":"[32,44,32,44]","infant1":"[32,44,32,44]","infant2":"[32,44,32,44]","child6":"[33,43,33,43]","child9":"[33,43,33,43]","child10":"[33,43,33,43]","teen12":"[36,47,35,45]","teen18":"[36,47,35,45]","adult":"[38,51,36,46]","step":"1","unit":"%","status":"0","color":"darkslateblue","type":"hemato","critmin":"20","critmax":"55","input_id":"","output_id":""},{"name":"MCV","tooltip":"Mean Corpuscular Volume","value":"","min":"","max":"","newborn3":"[90,123,90,123]","newborn14":"[90,123,90,123]","newborn30":"[90,123,90,123]","newborn60":"[90,123,90,123]","infant6":"[77,115,77,115]","infant1":"[74,108,74,108]","infant2":"[74,108,74,108]","child6":"[70,86,70,86]","child9":"[75,87,75,87]","child10":"[75,87,75,87]","teen12":"[75,87,75,87]","teen18":"[77,95,77,95]","adult":"[80,98,80,98]","step":"1","unit":"fL","status":"0","color":"darkslateblue","type":"hemato","critmin":"0","critmax":"0","input_id":"","output_id":""},{"name":"MCH","tooltip":"Mean Corpuscular Hemoglobin","value":"","min":"","max":"","newborn3":"[26,34,26,34]","newborn14":"[26,34,26,34]","newborn30":"[26,34,26,34]","newborn60":"[26,34,26,34]","infant6":"[26,34,26,34]","infant1":"[26,34,26,34]","infant2":"[26,34,26,34]","child6":"[26,34,26,34]","child9":"[26,34,26,34]","child10":"[26,34,26,34]","teen12":"[26,34,26,34]","teen18":"[26,34,26,34]","adult":"[26,34,26,34]","step":"1","unit":"pg","status":"0","color":"darkslateblue","type":"hemato","critmin":"0","critmax":"0","input_id":"","output_id":""},{"name":"MCHC","tooltip":"Mean Corpuscular Hemoglobin Concentration","value":"","min":"","max":"","newborn3":"[32,36,32,36]","newborn14":"[32,36,32,36]","newborn30":"[32,36,32,36]","newborn60":"[32,36,32,36]","infant6":"[32,36,32,36]","infant1":"[32,36,32,36]","infant2":"[32,36,32,36]","child6":"[32,36,32,36]","child9":"[32,36,32,36]","child10":"[32,36,32,36]","teen12":"[32,36,32,36]","teen18":"[32,36,32,36]","adult":"[32,36,32,36]","step":"1","unit":"g/dL","status":"0","color":"darkslateblue","type":"hemato","critmin":"0","critmax":"0","input_id":"","output_id":""},{"name":"Plt","tooltip":"Platelets","value":"","min":"","max":"","newborn3":"[150000,600000,150000,600000]","newborn14":"[150000,600000,150000,600000]","newborn30":"[150000,600000,150000,600000]","newborn60":"[150000,600000,150000,600000]","infant6":"[150000,600000,150000,600000]","infant1":"[150000,600000,150000,600000]","infant2":"[150000,500000,150000,500000]","child6":"[150000,500000,150000,500000]","child9":"[150000,500000,150000,500000]","child10":"[150000,500000,150000,500000]","teen12":"[150000,450000,150000,450000]","teen18":"[150000,450000,150000,450000]","adult":"[150000,450000,150000,450000]","step":"1000","unit":"/&#181L","status":"0","color":"darkslateblue","type":"hemato","critmin":"20000","critmax":"1000000","input_id":"","output_id":""},{"name":"RDW","tooltip":"Red blood cells Distribution Width","value":"","min":"","max":"","newborn3":"[11,15,11,15]","newborn14":"[11,15,11,15]","newborn30":"[11,15,11,15]","newborn60":"[11,15,11,15]","infant6":"[11,15,11,15]","infant1":"[11,15,11,15]","infant2":"[11,15,11,15]","child6":"[11,15,11,15]","child9":"[11,15,11,15]","child10":"[11,15,11,15]","teen12":"[11,15,11,15]","teen18":"[11,15,11,15]","adult":"[11,15,11,15]","step":"1","unit":"%","status":"0","color":"darkslateblue","type":"hemato","critmin":"0","critmax":"0","input_id":"","output_id":""},{"name":"MPV","tooltip":"Mean Platelet Volume","value":"","min":"","max":"","newborn3":"[8.5,13,8.5,13]","newborn14":"[8.5,13,8.5,13]","newborn30":"[8.5,13,8.5,13]","newborn60":"[8.5,13,8.5,13]","infant6":"[8.5,13,8.5,13]","infant1":"[8.5,13,8.5,13]","infant2":"[8.5,13,8.5,13]","child6":"[8.5,13,8.5,13]","child9":"[8.5,13,8.5,13]","child10":"[8.5,13,8.5,13]","teen12":"[8.5,13,8.5,13]","teen18":"[8.5,13,8.5,13]","adult":"[8.5,13,8.5,13]","step":"0.1","unit":"fL","status":"0","color":"darkslateblue","type":"hemato","critmin":"0","critmax":"0","input_id":"","output_id":""},{"name":"NRBC","tooltip":"Nucleated Red Blood Cells","value":"","min":"","max":"","newborn3":"[0,3,0,3]","newborn14":"[0,0,0,0]","newborn30":"[0,0,0,0]","newborn60":"[0,0,0,0]","infant6":"[0,0,0,0]","infant1":"[0,0,0,0]","infant2":"[0,0,0,0]","child6":"[0,0,0,0]","child9":"[0,0,0,0]","child10":"[0,0,0,0]","teen12":"[0,0,0,0]","teen18":"[0,0,0,0]","adult":"[0,0,0,0]","step":"1","unit":"%","status":"0","color":"darkslateblue","type":"hemato","critmin":"0","critmax":"0","input_id":"","output_id":""},{"name":"Retic","tooltip":"Reticulocyte Count","value":"","min":"","max":"","newborn3":"[2.5,6.5,2.5,6.5]","newborn14":"[2.5,6.5,2.5,6.5]","newborn30":"[0.5,2.5,0.5,2.5]","newborn60":"[0.5,2.5,0.5,2.5]","infant6":"[0.5,2.5,0.5,2.5]","infant1":"[0.5,2.5,0.5,2.5]","infant2":"[0.5,2.5,0.5,2.5]","child6":"[0.5,2.5,0.5,2.5]","child9":"[0.5,2.5,0.5,2.5]","child10":"[0.5,2.5,0.5,2.5]","teen12":"[0.5,2.5,0.5,2.5]","teen18":"[0.5,2.5,0.5,2.5]","adult":"[0.5,2.5,0.5,2.5]","step":"1","unit":"/&#181L","status":"0","color":"darkslateblue","type":"hemato","critmin":"0","critmax":"0","input_id":"","output_id":""},{"name":"ESR","tooltip":"Erythrocyte Sedimentation Rate","value":"","min":"","max":"","newborn3":"[0,15,0,20]","newborn14":"[0,15,0,20]","newborn30":"[0,15,0,20]","newborn60":"[0,15,0,20]","infant6":"[0,15,0,20]","infant1":"[0,15,0,20]","infant2":"[0,15,0,20]","child6":"[0,15,0,20]","child9":"[0,15,0,20]","child10":"[0,15,0,20]","teen12":"[0,15,0,20]","teen18":"[0,15,0,20]","adult":"[0,15,0,20]","step":"1","unit":"mm/hr","status":"0","color":"darkslateblue","type":"hemato","critmin":"0","critmax":"0","input_id":"","output_id":""},{"name":"CRP","tooltip":"C-Reactive Protein","value":"","min":"","max":"","newborn3":"[0,1,0,1]","newborn14":"[0,1,0,1]","newborn30":"[0,1,0,1]","newborn60":"[0,1,0,1]","infant6":"[0,1,0,1]","infant1":"[0,1,0,1]","infant2":"[0,1,0,1]","child6":"[0,1,0,1]","child9":"[0,1,0,1]","child10":"[0,1,0,1]","teen12":"[0,1,0,1]","teen18":"[0,1,0,1]","adult":"[0,1,0,1]","step":"1","unit":"mg/dL","status":"0","color":"darkslateblue","type":"hemato","critmin":"0","critmax":"0","input_id":"","output_id":""},{"name":"AST","tooltip":"Aspartate transaminase or SGOT","value":"","min":"","max":"","newborn3":"[17,59,14,36]","newborn14":"[17,59,14,36]","newborn30":"[17,59,14,36]","newborn60":"[17,59,14,36]","infant6":"[17,59,14,36]","infant1":"[17,59,14,36]","infant2":"[17,59,14,36]","child6":"[17,59,14,36]","child9":"[17,59,14,36]","child10":"[17,59,14,36]","teen12":"[17,59,14,36]","teen18":"[17,59,14,36]","adult":"[17,59,14,36]","step":"1","unit":"IU/L","status":"0","color":"darkslategrey","type":"lft","critmin":"0","critmax":"0","input_id":"","output_id":""},{"name":"ALT","tooltip":"Alanine transaminase or SGPT","value":"","min":"","max":"","newborn3":"[21,72,9,52]","newborn14":"[21,72,9,52]","newborn30":"[21,72,9,52]","newborn60":"[21,72,9,52]","infant6":"[21,72,9,52]","infant1":"[21,72,9,52]","infant2":"[21,72,9,52]","child6":"[21,72,9,52]","child9":"[21,72,9,52]","child10":"[21,72,9,52]","teen12":"[21,72,9,52]","teen18":"[21,72,9,52]","adult":"[21,72,9,52]","step":"1","unit":"IU/L","status":"0","color":"darkslategrey","type":"lft","critmin":"0","critmax":"0","input_id":"","output_id":""},{"name":"ALP","tooltip":"Alkaline Phosphatase","value":"","min":"","max":"","newborn3":"[100,300,100,300]","newborn14":"[100,300,100,300]","newborn30":"[100,300,100,300]","newborn60":"[100,300,100,300]","infant6":"[100,300,100,300]","infant1":"[100,300,100,300]","infant2":"[100,300,100,300]","child6":"[100,300,100,300]","child9":"[100,300,100,300]","child10":"[100,300,100,300]","teen12":"[100,300,100,300]","teen18":"[100,300,100,300]","adult":"[38,126,38,126]","step":"1","unit":"IU/L","status":"0","color":"darkslategrey","type":"lft","critmin":"0","critmax":"0","input_id":"","output_id":""},{"name":"Bil(T)","tooltip":"Total Bilirubin","value":"","min":"","max":"","newborn3":"[0.2,1.3,0.2,1.3]","newborn14":"[0.2,1.3,0.2,1.3]","newborn30":"[0.2,1.3,0.2,1.3]","newborn60":"[0.2,1.3,0.2,1.3]","infant6":"[0.2,1.3,0.2,1.3]","infant1":"[0.2,1.3,0.2,1.3]","infant2":"[0.2,1.3,0.2,1.3]","child6":"[0.2,1.3,0.2,1.3]","child9":"[0.2,1.3,0.2,1.3]","child10":"[0.2,1.3,0.2,1.3]","teen12":"[0.2,1.3,0.2,1.3]","teen18":"[0.2,1.3,0.2,1.3]","adult":"[0.2,1.3,0.2,1.3]","step":"0.1","unit":"mg/dL","status":"0","color":"darkslategrey","type":"lft","critmin":"0","critmax":"0","input_id":"","output_id":""},{"name":"Bil(D)","tooltip":"Direct (Conjugated) Bilirubin","value":"","min":"","max":"","newborn3":"[0,0.3,0,0.3]","newborn14":"[0,0.3,0,0.3]","newborn30":"[0,0.3,0,0.3]","newborn60":"[0,0.3,0,0.3]","infant6":"[0,0.3,0,0.3]","infant1":"[0,0.3,0,0.3]","infant2":"[0,0.3,0,0.3]","child6":"[0,0.3,0,0.3]","child9":"[0,0.3,0,0.3]","child10":"[0,0.3,0,0.3]","teen12":"[0,0.3,0,0.3]","teen18":"[0,0.3,0,0.3]","adult":"[0,0.3,0,0.3]","step":"0.1","unit":"mg/dL","status":"0","color":"darkslategrey","type":"lft","critmin":"0","critmax":"0","input_id":"","output_id":""},{"name":"Alb","tooltip":"Total Albumin","value":"","min":"","max":"","newborn3":"[3.5,5,3.5,5]","newborn14":"[3.5,5,3.5,5]","newborn30":"[3.5,5,3.5,5]","newborn60":"[3.5,5,3.5,5]","infant6":"[3.5,5,3.5,5]","infant1":"[3.5,5,3.5,5]","infant2":"[3.5,5,3.5,5]","child6":"[3.5,5,3.5,5]","child9":"[3.5,5,3.5,5]","child10":"[3.5,5,3.5,5]","teen12":"[3.5,5,3.5,5]","teen18":"[3.5,5,3.5,5]","adult":"[3.5,5,3.5,5]","step":"0.1","unit":"IU/L","status":"0","color":"darkslategrey","type":"lft","critmin":"0","critmax":"0","input_id":"","output_id":""},{"name":"GGT","tooltip":"Gamma-glutamyl transferase","value":"","min":"","max":"","newborn3":"[12,73,12,43]","newborn14":"[12,73,12,43]","newborn30":"[12,73,12,43]","newborn60":"[12,73,12,43]","infant6":"[12,73,12,43]","infant1":"[12,73,12,43]","infant2":"[12,73,12,43]","child6":"[12,73,12,43]","child9":"[12,73,12,43]","child10":"[12,73,12,43]","teen12":"[12,73,12,43]","teen18":"[12,73,12,43]","adult":"[12,73,12,43]","step":"1","unit":"IU/L","status":"0","color":"darkslategrey","type":"lft","critmin":"0","critmax":"0","input_id":"","output_id":""},{"name":"TSH","tooltip":"Thyroid Stimulating Hormone","value":"","min":"","max":"","newborn3":"[0.47,4.68,0.47,4.68]","newborn14":"[0.47,4.68,0.47,4.68]","newborn30":"[0.47,4.68,0.47,4.68]","newborn60":"[0.47,4.68,0.47,4.68]","infant6":"[0.47,4.68,0.47,4.68]","infant1":"[0.47,4.68,0.47,4.68]","infant2":"[0.47,4.68,0.47,4.68]","child6":"[0.47,4.68,0.47,4.68]","child9":"[0.47,4.68,0.47,4.68]","child10":"[0.47,4.68,0.47,4.68]","teen12":"[0.47,4.68,0.47,4.68]","teen18":"[0.47,4.68,0.47,4.68]","adult":"[0.47,4.68,0.47,4.68]","step":"0.1","unit":"mIU/L","status":"0","color":"rgb(65, 87, 65)","type":"tft","critmin":"0","critmax":"0","input_id":"","output_id":""},{"name":"FT4","tooltip":"Free Thyroxin","value":"","min":"","max":"","newborn3":"[0.78,2.19,0.78,2.19]","newborn14":"[0.78,2.19,0.78,2.19]","newborn30":"[0.78,2.19,0.78,2.19]","newborn60":"[0.78,2.19,0.78,2.19]","infant6":"[0.78,2.19,0.78,2.19]","infant1":"[0.78,2.19,0.78,2.19]","infant2":"[0.78,2.19,0.78,2.19]","child6":"[0.78,2.19,0.78,2.19]","child9":"[0.78,2.19,0.78,2.19]","child10":"[0.78,2.19,0.78,2.19]","teen12":"[0.78,2.19,0.78,2.19]","teen18":"[0.78,2.19,0.78,2.19]","adult":"[0.78,2.19,0.78,2.19]","step":"0.1","unit":"ng/dL","status":"0","color":"rgb(65, 87, 65)","type":"tft","critmin":"0","critmax":"0","input_id":"","output_id":""},{"name":"T4","tooltip":"Total Thyroxin","value":"","min":"","max":"","newborn3":"[5.5,11,5.5,11]","newborn14":"[5.5,11,5.5,11]","newborn30":"[5.5,11,5.5,11]","newborn60":"[5.5,11,5.5,11]","infant6":"[5.5,11,5.5,11]","infant1":"[5.5,11,5.5,11]","infant2":"[5.5,11,5.5,11]","child6":"[5.5,11,5.5,11]","child9":"[5.5,11,5.5,11]","child10":"[5.5,11,5.5,11]","teen12":"[5.5,11,5.5,11]","teen18":"[5.5,11,5.5,11]","adult":"[5.5,11,5.5,11]","step":"1","unit":"&#181g/dL","status":"0","color":"rgb(65, 87, 65)","type":"tft","critmin":"0","critmax":"0","input_id":"","output_id":""},{"name":"Ft3","tooltip":"Free Triiodothyronine","value":"","min":"","max":"","newborn3":"[2.3,4.2,2.3,4.2]","newborn14":"[2.3,4.2,2.3,4.2]","newborn30":"[2.3,4.2,2.3,4.2]","newborn60":"[2.3,4.2,2.3,4.2]","infant6":"[2.3,4.2,2.3,4.2]","infant1":"[2.3,4.2,2.3,4.2]","infant2":"[2.3,4.2,2.3,4.2]","child6":"[2.3,4.2,2.3,4.2]","child9":"[2.3,4.2,2.3,4.2]","child10":"[2.3,4.2,2.3,4.2]","teen12":"[2.3,4.2,2.3,4.2]","teen18":"[2.3,4.2,2.3,4.2]","adult":"[2.3,4.2,2.3,4.2]","step":"0.1","unit":"pg/dL","status":"0","color":"rgb(65, 87, 65)","type":"tft","critmin":"0","critmax":"0","input_id":"","output_id":""},{"name":"T3","tooltip":"Total Triiodothyronine","value":"","min":"","max":"","newborn3":"[80,180,80,180]","newborn14":"[80,180,80,180]","newborn30":"[80,180,80,180]","newborn60":"[80,180,80,180]","infant6":"[80,180,80,180]","infant1":"[80,180,80,180]","infant2":"[80,180,80,180]","child6":"[80,180,80,180]","child9":"[80,180,80,180]","child10":"[80,180,80,180]","teen12":"[80,180,80,180]","teen18":"[80,180,80,180]","adult":"[80,180,80,180]","step":"1","unit":"ng/dL","status":"0","color":"rgb(65, 87, 65)","type":"tft","critmin":"0","critmax":"0","input_id":"","output_id":""},{"name":"RIA","tooltip":"Radioactive Iodine Uptake","value":"","min":"","max":"","newborn3":"[5,30,5,30]","newborn14":"[5,30,5,30]","newborn30":"[5,30,5,30]","newborn60":"[5,30,5,30]","infant6":"[5,30,5,30]","infant1":"[5,30,5,30]","infant2":"[5,30,5,30]","child6":"[5,30,5,30]","child9":"[5,30,5,30]","child10":"[5,30,5,30]","teen12":"[5,30,5,30]","teen18":"[5,30,5,30]","adult":"[5,30,5,30]","step":"1","unit":"%","status":"0","color":"rgb(65, 87, 65)","type":"tft","critmin":"0","critmax":"0","input_id":"","output_id":""},{"name":"TSI","tooltip":"Thyroid-stimulating Immunoglobulin","value":"","min":"","max":"","newborn3":"[0,130,0,130]","newborn14":"[0,130,0,130]","newborn30":"[0,130,0,130]","newborn60":"[0,130,0,130]","infant6":"[0,130,0,130]","infant1":"[0,130,0,130]","infant2":"[0,130,0,130]","child6":"[0,130,0,130]","child9":"[0,130,0,130]","child10":"[0,130,0,130]","teen12":"[0,130,0,130]","teen18":"[0,130,0,130]","adult":"[0,130,0,130]","step":"1","unit":"%","status":"0","color":"rgb(65, 87, 65)","type":"tft","critmin":"0","critmax":"0","input_id":"","output_id":""},{"name":"TBG","tooltip":"Thyroxine-binding Globulin","value":"","min":"","max":"","newborn3":"[12,27,12,27]","newborn14":"[12,27,12,27]","newborn30":"[12,27,12,27]","newborn60":"[12,27,12,27]","infant6":"[12,27,12,27]","infant1":"[12,27,12,27]","infant2":"[12,27,12,27]","child6":"[12,27,12,27]","child9":"[12,27,12,27]","child10":"[12,27,12,27]","teen12":"[12,27,12,27]","teen18":"[12,27,12,27]","adult":"[12,27,12,27]","step":"1","unit":"&#181g/mL","status":"0","color":"rgb(65, 87, 65)","type":"tft","critmin":"0","critmax":"0","input_id":"","output_id":""},{"name":"TG","tooltip":"Thyroglobulin","value":"","min":"","max":"","newborn3":"[0,20,0,20]","newborn14":"[0,20,0,20]","newborn30":"[0,20,0,20]","newborn60":"[0,20,0,20]","infant6":"[0,20,0,20]","infant1":"[0,20,0,20]","infant2":"[0,20,0,20]","child6":"[0,20,0,20]","child9":"[0,20,0,20]","child10":"[0,20,0,20]","teen12":"[0,20,0,20]","teen18":"[0,20,0,20]","adult":"[0,20,0,20]","step":"1","unit":"ng/mL","status":"0","color":"rgb(65, 87, 65)","type":"tft","critmin":"0","critmax":"0","input_id":"","output_id":""},{"name":"Cr","tooltip":"Creatinine","value":"","min":"","max":"","newborn3":"[0.66,1.25,0.52,1.04]","newborn14":"[0.66,1.25,0.52,1.04]","newborn30":"[0.66,1.25,0.52,1.04]","newborn60":"[0.66,1.25,0.52,1.04]","infant6":"[0.66,1.25,0.52,1.04]","infant1":"[0.66,1.25,0.52,1.04]","infant2":"[0.66,1.25,0.52,1.04]","child6":"[0.66,1.25,0.52,1.04]","child9":"[0.66,1.25,0.52,1.04]","child10":"[0.66,1.25,0.52,1.04]","teen12":"[0.66,1.25,0.52,1.04]","teen18":"[0.66,1.25,0.52,1.04]","adult":"[0.66,1.25,0.52,1.04]","step":"0.1","unit":"mg/dL","status":"0","color":"rgb(128, 70, 32)","type":"kft","critmin":"0","critmax":"0","input_id":"","output_id":""},{"name":"BUN","tooltip":"Blood Urea Nitrogen","value":"","min":"","max":"","newborn3":"[9,20,7,17]","newborn14":"[9,20,7,17]","newborn30":"[9,20,7,17]","newborn60":"[9,20,7,17]","infant6":"[9,20,7,17]","infant1":"[9,20,7,17]","infant2":"[9,20,7,17]","child6":"[9,20,7,17]","child9":"[9,20,7,17]","child10":"[9,20,7,17]","teen12":"[9,20,7,17]","teen18":"[9,20,7,17]","adult":"[9,20,7,17]","step":"1","unit":"mg/dL","status":"0","color":"rgb(128, 70, 32)","type":"kft","critmin":"0","critmax":"0","input_id":"","output_id":""},{"name":"Na","tooltip":"Sodium","value":"","min":"","max":"","newborn3":"[137,145,137,145]","newborn14":"[137,145,137,145]","newborn30":"[137,145,137,145]","newborn60":"[137,145,137,145]","infant6":"[137,145,137,145]","infant1":"[137,145,137,145]","infant2":"[137,145,137,145]","child6":"[137,145,137,145]","child9":"[137,145,137,145]","child10":"[137,145,137,145]","teen12":"[137,145,137,145]","teen18":"[137,145,137,145]","adult":"[137,145,137,145]","step":"1","unit":"mmol/L","status":"0","color":"rgb(128, 70, 32)","type":"kft","critmin":"0","critmax":"0","input_id":"","output_id":""},{"name":"K","tooltip":"Potassium","value":"","min":"","max":"","newborn3":"[3.5,5.1,3.5,5.1]","newborn14":"[3.5,5.1,3.5,5.1]","newborn30":"[3.5,5.1,3.5,5.1]","newborn60":"[3.5,5.1,3.5,5.1]","infant6":"[3.5,5.1,3.5,5.1]","infant1":"[3.5,5.1,3.5,5.1]","infant2":"[3.5,5.1,3.5,5.1]","child6":"[3.5,5.1,3.5,5.1]","child9":"[3.5,5.1,3.5,5.1]","child10":"[3.5,5.1,3.5,5.1]","teen12":"[3.5,5.1,3.5,5.1]","teen18":"[3.5,5.1,3.5,5.1]","adult":"[3.5,5.1,3.5,5.1]","step":"0.1","unit":"mmol/L","status":"0","color":"rgb(128, 70, 32)","type":"kft","critmin":"0","critmax":"0","input_id":"","output_id":""},{"name":"Uric Acid","tooltip":"Uric Acid","value":"","min":"","max":"","newborn3":"[3.5,8.5,2.5,6.2]","newborn14":"[3.5,8.5,2.5,6.2]","newborn30":"[3.5,8.5,2.5,6.2]","newborn60":"[3.5,8.5,2.5,6.2]","infant6":"[3.5,8.5,2.5,6.2]","infant1":"[3.5,8.5,2.5,6.2]","infant2":"[3.5,8.5,2.5,6.2]","child6":"[3.5,8.5,2.5,6.2]","child9":"[3.5,8.5,2.5,6.2]","child10":"[3.5,8.5,2.5,6.2]","teen12":"[3.5,8.5,2.5,6.2]","teen18":"[3.5,8.5,2.5,6.2]","adult":"[3.5,8.5,2.5,6.2]","step":"0.1","unit":"mg/dL","status":"0","color":"rgb(128, 70, 32)","type":"kft","critmin":"0","critmax":"0","input_id":"","output_id":""},{"name":"FBS","tooltip":"Serum Glucose","value":"","min":"","max":"","newborn3":"[70,100,70,100]","newborn14":"[70,100,70,100]","newborn30":"[70,100,70,100]","newborn60":"[70,100,70,100]","infant6":"[70,100,70,100]","infant1":"[70,100,70,100]","infant2":"[70,100,70,100]","child6":"[70,100,70,100]","child9":"[70,100,70,100]","child10":"[70,100,70,100]","teen12":"[70,100,70,100]","teen18":"[70,100,70,100]","adult":"[70,100,70,100]","step":"1","unit":"mg/dL","status":"0","color":"rgb(102, 30, 52)","type":"bio","critmin":"60","critmax":"400","input_id":"","output_id":""},{"name":"TG","tooltip":"Total Triglycerid","value":"","min":"","max":"","newborn3":"[0,150,0,150]","newborn14":"[0,150,0,150]","newborn30":"[0,150,0,150]","newborn60":"[0,150,0,150]","infant6":"[0,150,0,150]","infant1":"[0,150,0,150]","infant2":"[0,150,0,150]","child6":"[0,150,0,150]","child9":"[0,150,0,150]","child10":"[0,150,0,150]","teen12":"[0,150,0,150]","teen18":"[0,150,0,150]","adult":"[0,150,0,150]","step":"1","unit":"mg/dL","status":"0","color":"rgb(102, 30, 52)","type":"bio","critmin":"0","critmax":"0","input_id":"","output_id":""},{"name":"Chol","tooltip":"Total Cholestrol","value":"","min":"","max":"","newborn3":"[0,200,0,200]","newborn14":"[0,200,0,200]","newborn30":"[0,200,0,200]","newborn60":"[0,200,0,200]","infant6":"[0,200,0,200]","infant1":"[0,200,0,200]","infant2":"[0,200,0,200]","child6":"[0,200,0,200]","child9":"[0,200,0,200]","child10":"[0,200,0,200]","teen12":"[0,200,0,200]","teen18":"[0,200,0,200]","adult":"[0,200,0,200]","step":"1","unit":"mg/dL","status":"0","color":"rgb(102, 30, 52)","type":"bio","critmin":"0","critmax":"0","input_id":"","output_id":""},{"name":"LDL","tooltip":"Low Density Lipoprotein","value":"","min":"","max":"","newborn3":"[0,140,0,140]","newborn14":"[0,140,0,140]","newborn30":"[0,140,0,140]","newborn60":"[0,140,0,140]","infant6":"[0,140,0,140]","infant1":"[0,140,0,140]","infant2":"[0,140,0,140]","child6":"[0,140,0,140]","child9":"[0,140,0,140]","child10":"[0,140,0,140]","teen12":"[0,140,0,140]","teen18":"[0,140,0,140]","adult":"[0,140,0,140]","step":"1","unit":"mg/dL","status":"0","color":"rgb(102, 30, 52)","type":"bio","critmin":"0","critmax":"0","input_id":"","output_id":""},{"name":"HDL","tooltip":"High Density Lipoprotein","value":"","min":"","max":"","newborn3":"[40,0,40,0]","newborn14":"[40,0,40,0]","newborn30":"[40,0,40,0]","newborn60":"[40,0,40,0]","infant6":"[40,0,40,0]","infant1":"[40,0,40,0]","infant2":"[40,0,40,0]","child6":"[40,0,40,0]","child9":"[40,0,40,0]","child10":"[40,0,40,0]","teen12":"[40,0,40,0]","teen18":"[40,0,40,0]","adult":"[40,0,40,0]","step":"1","unit":"mg/dL","status":"0","color":"rgb(102, 30, 52)","type":"bio","critmin":"0","critmax":"0","input_id":"","output_id":""}]
;
