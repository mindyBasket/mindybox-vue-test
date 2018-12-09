console.log("Script loaded");

//var local_data = data;
//console.log(JSON.stringify(local_data));



// Note: components must come first before "new Vue"


Vue.component('project-card', {

    props:{
    	proj: Object,
    	index: Number // order of project at the moment. This is NOT a key.
  	},
  	data() {
	    return {
	      	isActive: false
	    }
	},
  	methods: {
	  	openCard: function(){
	  		if (this.isActive){
	  			vm.removeCurrFiller();
	  		} else { 
	  			vm.addFiller(this.index);
	  		}
	  		this.isActive = !this.isActive;
	  	}
	},
  	template: `
		<div class="card project" 
			 v-on:click="openCard"
			 v-bind:class = "{ 'active': isActive, 'filler' : proj.hasOwnProperty('isFiller') ? proj.isFiller : false}"
			 v-bind:index = "index">
			<div class="thumbnail">
				<img src=""/>
			</div>
			<div class="title">{{proj.title}}</div>

			<div class="short_summary">
				<div class="summary">{{proj.shortSummary}}</div>
				<div class="tags flex_row wrap">
					<span v-for="tag in proj.tags">{{tag}}</span>
				</div>
			</div>
			<div class="long_summary">{{proj.longSummary}}</div>
		</div>
	`

		
});


var vm = new Vue({
  el: '#projects1',
  data: {
  	projectData: projectData,
  	isActive: false
  },

  methods: {
  	duplicateProjObj: function(ind){
  		const copyProj = JSON.parse(JSON.stringify(this.projectData.projects[ind]));
  			  copyProj.title=copyProj.title+copyProj.title;
  			  copyProj.isFiller=true;
  		return copyProj;
  	},
  	addFiller: function (ind) {
  		console.log("Add filler");
      	this.projectData.projects.splice(ind+1, 0, this.duplicateProjObj(0) );
    },
    removeCurrFiller: function () {
    	const targetInd = Number(document.querySelector(".project.filler").getAttribute("index"));
    	console.log(targetInd);
    	if (targetInd != null || targetInd === undefined){
    		console.log(`Remove filler at ${targetInd}`);
    		this.projectData.projects.splice(targetInd, 1);
    	}
      	
    }
  }

});

