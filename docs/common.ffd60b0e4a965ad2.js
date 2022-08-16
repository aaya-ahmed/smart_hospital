"use strict";(self.webpackChunksmart_hospital=self.webpackChunksmart_hospital||[]).push([[592],{1820:(M,_,c)=>{c.d(_,{j:()=>Z});var e=c(5e3),b=c(6325),s=c(3075),h=c(9808),m=c(7322),C=c(7531),v=c(7122);function q(r,u){if(1&r&&e._UZ(0,"option",33),2&r){const n=u.$implicit;e.hYB("value","",n.firstName," ",n.lastName,"")}}function O(r,u){if(1&r&&(e.TgZ(0,"option",33),e._uU(1),e.qZA()),2&r){const n=u.$implicit;e.s9C("value",n.id),e.xp6(1),e.Oqu(n.department_Name)}}function A(r,u){if(1&r&&(e.TgZ(0,"option",33),e._uU(1),e.qZA()),2&r){const n=u.$implicit;e.s9C("value",u.index),e.xp6(1),e.Oqu(n.doctorName)}}function D(r,u){if(1&r&&(e.TgZ(0,"option",33),e._uU(1),e.qZA()),2&r){const n=u.$implicit;e.s9C("value",u.index),e.xp6(1),e.Oqu(n.slotTime)}}const g=function(r){return{"is-invalid":r}},k=function(r){return{show:r}};let Z=(()=>{class r{constructor(n){this.generalservices=n,this.patients=[],this.departments=[],this.fullschadule=[],this.busyslot=[],this.showslot=[],this.workofdays=[],this.minDate=new Date,this.maxDate=new Date,this.doctorSchadule={doctorId:0,doctorName:"",workSchedules:[]},this.appoint={timeslotdto:{slotnumber:0,dayofwork:0,slot_time:"",reserved:!0,doctorId:0},appointmentDto:{appointmentDate:"",appointmentType:"",complain:"",patientId:0,doctorId:0,examined:!1}},this.departmentflag=!1,this.doctorflag=!1,this.submitted=!1,this.selectflag=!1,this.patientid=0,this.patientname="",this.weekendsDatesFilter=t=>{if(null==t)return!1;{const o=t.getDay();return!(o!==this.workofdays[0]&&o!==this.workofdays[1]&&o!==this.workofdays[2]&&o!==this.workofdays[3]&&o!==this.workofdays[4]&&o!==this.workofdays[5]&&o!==this.workofdays[6])}}}ngOnInit(){if("patient"==localStorage.getItem("userRole")){this.selectflag=!0;let n=localStorage.getItem("userInfo");this.patientid=JSON.parse(n).id,this.patientname=JSON.parse(n).firstName+" "+JSON.parse(n).lastName}else this.generalservices.get("Patient/getAllPatients").subscribe(n=>{this.patients=n});this.generalservices.get("Departments/GetAllClinicalDept").subscribe(n=>{this.departments=n}),this.maxDate.setDate(this.maxDate.getDate()+90)}getallschadule(n){this.showslot=[];let t=n.target.value;""!=t?(this.departmentflag=!0,this.generalservices.get("TimeSlot/GetSlotsByDepartment/"+t).subscribe(o=>{this.fullschadule=o})):(this.departmentflag=!1,this.fullschadule=[])}getdoctorschadule(n){let t=n.target.value;if(""!=t){this.doctorflag=!0,this.generalservices.get("TimeSlot/GetBusySlots/"+this.fullschadule[t].doctorId+"/"+this.minDate.toISOString().substring(0,10)+"/"+this.maxDate.toISOString().substring(0,10)).subscribe(o=>{this.busyslot=o}),this.workofdays=[],this.doctorSchadule={doctorId:0,doctorName:"",workSchedules:[]},this.doctorSchadule=this.fullschadule[t];for(let o of this.fullschadule[t].workSchedules)this.workofdays.push(o.dayOfWork)}else this.doctorflag=!1}getdate(n){var t;let o=n.target.value.toISOString().substring(0,10),i=new Date(o);i.setDate(i.getDate()+1);let l=i.toISOString().substring(0,10);this.showslot=null===(t=this.doctorSchadule.workSchedules.find(a=>a.dayOfWork==n.target.value.getDay()))||void 0===t?void 0:t.slots;let d=this.busyslot.find(a=>a.day.substring(0,10)==l);if(null!=d&&d.busySlots.length>0)for(let a of d.busySlots){let f=this.showslot.findIndex(p=>p.slotTime==a);this.showslot.splice(f,1)}}submitappoint(n){if(this.submitted=!0,n.valid){let t=n.value.appointdate.toISOString().substring(0,8)+String(n.value.appointdate).substring(8,10);if(this.appoint.timeslotdto.slotnumber=this.showslot[parseInt(n.value.time)].slotNumber,this.appoint.timeslotdto.slot_time=this.showslot[parseInt(n.value.time)].slotTime,this.appoint.timeslotdto.dayofwork=n.value.appointdate.getDay(),this.appoint.timeslotdto.doctorId=this.fullschadule[parseInt(n.value.doctorid)].doctorId,this.appoint.appointmentDto.appointmentDate=t,this.appoint.appointmentDto.appointmentType="Appointment",this.appoint.appointmentDto.complain=n.value.complain,this.appoint.appointmentDto.doctorId=this.fullschadule[parseInt(n.value.doctorid)].doctorId,0==this.patientid){let o=this.patients.find(i=>i.firstName+" "+i.lastName==n.value.patientid);this.appoint.appointmentDto.patientId=o.id}else this.appoint.appointmentDto.patientId=this.patientid;this.generalservices.post("Appointment",this.appoint).subscribe(o=>{n.reset(),this.submitted=!1,this.generalservices.get("TimeSlot/GetBusySlots/"+this.appoint.appointmentDto.doctorId+"/"+this.minDate.toISOString().split("T")[0]+"/"+this.maxDate.toISOString().split("T")[0]).subscribe(i=>{this.busyslot=i})})}else n.submitted=!0}}return r.\u0275fac=function(n){return new(n||r)(e.Y36(b.r))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-make-appointment"]],decls:72,vars:45,consts:[[1,"contents"],[1,"container"],[1,"row","align-items-center","justify-content-center"],[1,"col-md-9"],[3,"ngSubmit"],["appointform","ngForm"],[1,"row","justify-content-around","form-row"],[1,"col-md-11","col-sm-12"],[3,"hidden"],["type","text","id","name","list","patientname","required","","name","patientid","ngModel","",1,"form-select",3,"hidden","disabled","ngClass"],["patientid","ngModel"],["id","patientname",3,"hidden","ngClass"],[3,"value",4,"ngFor","ngForOf"],[1,"invalid-feedback"],[1,"form-label",3,"hidden"],[1,"form-control",3,"hidden"],[1,"col-md-5","col-sm-12"],[1,"form-label"],["required","","name","clinical","ngModel","",1,"form-select",3,"ngClass","change"],["clinical","ngModel"],["required","","name","doctorid","ngModel","",1,"form-select",3,"disabled","ngClass","change"],["doctorid","ngModel"],[1,"invalid-feedback",3,"ngClass"],["matInput","","required","","name","appointdate","ngModel","","placeholder","choose your date","aria-owns","mat-datepicker-3",3,"min","max","disabled","matDatepickerFilter","matDatepicker","ngClass","dateChange"],["minmaxInput","","appointdate","ngModel"],["matSuffix","",2,"display","block",3,"for"],["minmaxvalidation",""],["required","","name","time","ngModel","",1,"form-select",3,"disabled","ngClass","change"],["time","ngModel"],[1,"col-11"],["row","120","col","90","name","complain","ngModel","",1,"form-control"],["complain","ngModel"],["type","submit",1,"appoint_btn"],[3,"value"]],template:function(n,t){if(1&n){const o=e.EpF();e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"form",4,5),e.NdJ("ngSubmit",function(){e.CHM(o);const l=e.MAs(5);return t.submitappoint(l)}),e.TgZ(6,"h1"),e._uU(7,"Make Appointment"),e.qZA(),e.TgZ(8,"div",6)(9,"div",7)(10,"label",8),e._uU(11,"Patient Name"),e.qZA(),e._UZ(12,"input",9,10),e.TgZ(14,"datalist",11),e.YNc(15,q,1,2,"option",12),e.qZA(),e.TgZ(16,"div",13),e._uU(17),e.qZA(),e.TgZ(18,"label",14),e._uU(19,"Your Name"),e.qZA(),e.TgZ(20,"p",15),e._uU(21),e.qZA()()(),e.TgZ(22,"div",6)(23,"div",16)(24,"label",17),e._uU(25,"clinical"),e.qZA(),e.TgZ(26,"select",18,19),e.NdJ("change",function(l){return t.getallschadule(l)}),e.YNc(28,O,2,2,"option",12),e.qZA()(),e.TgZ(29,"div",16)(30,"label",17),e._uU(31,"doctor"),e.qZA(),e.TgZ(32,"select",20,21),e.NdJ("change",function(l){return t.getdoctorschadule(l)}),e._UZ(34,"option"),e.YNc(35,A,2,2,"option",12),e.qZA(),e.TgZ(36,"div",13),e._uU(37),e.qZA(),e.TgZ(38,"div",22),e._uU(39),e.qZA()()(),e.TgZ(40,"div",6)(41,"div",16)(42,"mat-form-field")(43,"input",23,24),e.NdJ("dateChange",function(l){return t.getdate(l)}),e.qZA(),e._UZ(46,"mat-datepicker-toggle",25)(47,"mat-datepicker",null,26),e.qZA(),e.TgZ(49,"div"),e._uU(50),e.qZA()(),e.TgZ(51,"div",16)(52,"label",17),e._uU(53,"time"),e.qZA(),e.TgZ(54,"select",27,28),e.NdJ("change",function(l){return l}),e._UZ(56,"option"),e.YNc(57,D,2,2,"option",12),e.qZA(),e.TgZ(58,"div"),e._uU(59),e.qZA()(),e._UZ(60,"div",16),e.qZA(),e.TgZ(61,"div",6)(62,"div",29)(63,"div")(64,"label",17),e._uU(65,"Complain"),e.qZA(),e._UZ(66,"textarea",30,31),e.qZA()()(),e.TgZ(68,"div",6)(69,"div",29)(70,"button",32),e._uU(71,"Appoint"),e.qZA()()()()()()()()}if(2&n){const o=e.MAs(5),i=e.MAs(13),l=e.MAs(27),d=e.MAs(33),a=e.MAs(45),f=e.MAs(48),p=e.MAs(55);e.xp6(10),e.Q6J("hidden",t.selectflag),e.xp6(2),e.Q6J("hidden",t.selectflag)("disabled",t.selectflag)("ngClass",e.VKq(31,g,(null==i.errors?null:i.errors.required)&&i.touched||t.submitted&&(null==i.errors?null:i.errors.required))),e.xp6(2),e.Q6J("hidden",t.selectflag)("ngClass",e.VKq(33,g,(null==i.errors?null:i.errors.required)&&i.touched||(null==i.errors?null:i.errors.required)&&o.submitted)),e.xp6(1),e.Q6J("ngForOf",t.patients),e.xp6(2),e.hij(" ",null!=i.errors&&i.errors.required&&i.touched||null!=i.errors&&i.errors.required&&o.submitted?"this is required":""," "),e.xp6(1),e.Q6J("hidden",!t.selectflag),e.xp6(2),e.Q6J("hidden",!t.selectflag),e.xp6(1),e.Oqu(t.patientname),e.xp6(5),e.Q6J("ngClass",e.VKq(35,g,(null==l.errors?null:l.errors.required)&&l.touched)),e.xp6(2),e.Q6J("ngForOf",t.departments),e.xp6(4),e.Q6J("disabled",!t.departmentflag)("ngClass",e.VKq(37,g,(null==d.errors?null:d.errors.required)&&d.touched||(null==d.errors?null:d.errors.required)&&t.submitted)),e.xp6(3),e.Q6J("ngForOf",t.fullschadule),e.xp6(2),e.Oqu(null!=d.errors&&d.errors.required&&d.touched||null!=d.errors&&d.errors.required&&t.submitted?"this field is required":""),e.xp6(1),e.Q6J("ngClass",e.VKq(39,k,!t.departmentflag)),e.xp6(1),e.Oqu(t.departmentflag?"":"please choose clinical"),e.xp6(4),e.Q6J("min",t.minDate)("max",t.maxDate)("disabled",!t.doctorflag)("matDatepickerFilter",t.weekendsDatesFilter)("matDatepicker",f)("ngClass",e.VKq(41,g,(null==a.errors?null:a.errors.required)&&a.touched||t.submitted&&(null==a.errors?null:a.errors.required))),e.xp6(3),e.Q6J("for",f),e.xp6(4),e.hij(" ",null!=a.errors&&a.errors.required&&a.touched||t.submitted&&null!=a.errors&&a.errors.required?"this field is required":""," "),e.xp6(4),e.Q6J("disabled",!t.doctorflag)("ngClass",e.VKq(43,g,(null==p.errors?null:p.errors.required)&&p.touched||t.submitted&&(null==p.errors?null:p.errors.required))),e.xp6(3),e.Q6J("ngForOf",t.showslot),e.xp6(2),e.hij(" ",null!=p.errors&&p.errors.required&&p.touched||t.submitted&&null!=p.errors&&p.errors.required?"this field is required":""," ")}},directives:[s._Y,s.JL,s.F,s.Fj,s.Q7,s.JJ,s.On,h.mk,h.sg,s.YN,s.Kr,s.EJ,m.KE,C.Nt,v.hl,v.nW,m.R9,v.Mq],styles:[".contents[_ngcontent-%COMP%]{width:100%;height:100vh}.contents[_ngcontent-%COMP%]   .form-select[_ngcontent-%COMP%]{box-shadow:0 1px 2px #0000001a;border-radius:4px;height:40px;background:#fff}.container[_ngcontent-%COMP%] > .row[_ngcontent-%COMP%]{width:100%;min-height:550px}form[_ngcontent-%COMP%]{background-color:#f6fbf9;border-radius:1rem}.mat-datepicker-toggle[_ngcontent-%COMP%]{color:#12201b;width:100%;font-size:40px}.mat-form-field-appearance-legacy[_ngcontent-%COMP%]   .mat-form-field-prefix[_ngcontent-%COMP%]   .mat-datepicker-toggle-default-icon[_ngcontent-%COMP%], .mat-form-field-appearance-legacy[_ngcontent-%COMP%]   .mat-form-field-suffix[_ngcontent-%COMP%]   .mat-datepicker-toggle-default-icon[_ngcontent-%COMP%]{width:2em!important}svg.mat-datepicker-toggle-default-icon.ng-star-inserted[_ngcontent-%COMP%]{width:5rem}.mat-form-field[_ngcontent-%COMP%]{width:100%}.times[_ngcontent-%COMP%]{width:100%;height:30vh;overflow-y:auto;background-color:#fff;margin:.5rem 0}.form-label[_ngcontent-%COMP%]{font-size:20px;padding:1rem 0 0}.appoint_btn[_ngcontent-%COMP%]{background-color:#a7d7c5;border:none;outline:none;color:#fff;padding:.5rem 1rem;border-radius:5px;margin:2rem 0rem}table[_ngcontent-%COMP%]{width:100%;background-color:#fff}.header-table[_ngcontent-%COMP%]{text-align:center;width:100%}.is-invalid[_ngcontent-%COMP%]{border:2px solid #dc3545}form[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{width:100%;text-align:center;font-weight:600;margin:0 0 1rem}  .mat-form-field-label,   .mat-form-field-underline{color:#000!important}.form-row[_ngcontent-%COMP%]{width:80%;margin:0 auto}@media (max-width:990px){.form-row[_ngcontent-%COMP%]{width:100%}}.show[_ngcontent-%COMP%]{display:block}"]}),r})()},7565:(M,_,c)=>{c.d(_,{h:()=>b});var e=c(5e3);let b=(()=>{class s{constructor(){this.requests={id:0,scanName:"",scanId:0,createdDtm:"",patientId:0,doctorId:0,patientName:"",doctorName:"",indoorPatientRecordId:0},this.user={patientid:0,patientname:"",nurseid:0,nursename:"",patientage:0,indoorPatientId:0},this.requsts={id:0,labName:"",testId:0,createdDtm:"",patientId:0,doctorId:0,patientName:"",doctorName:"",indoorPatientRecordId:0}}set request(m){this.requests=m}get request(){return this.requests}set userinfo(m){this.user=m}get userinfo(){return this.user}set testrequest(m){this.requsts=m}get testrequest(){return this.requsts}}return s.\u0275fac=function(m){return new(m||s)},s.\u0275prov=e.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})()}}]);