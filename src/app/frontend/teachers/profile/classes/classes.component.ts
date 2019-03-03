import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 ;

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

	registerForm: FormGroup;
    submitted = false;
    exampleData; options; 
    selectedSubjects

  	constructor(private formBuilder: FormBuilder) { }

  	ngOnInit() {

  		this.registerForm = this.formBuilder.group({ 
            subjects: ['', Validators.required],
            title: ['', Validators.required],
            description: ['', Validators.required]  
        });


        this.exampleData = [
	      {
	        id: 'opt1',
	        text: 'Options 1'
	      },
	      {
	        id: 'opt2',
	        text: 'Options 2'
	      },
	      {
	        id: 'opt3',
	        text: 'Options 3'
	      },
	      {
	        id: 'opt4',
	        text: 'Options 4'
	      }
	    ];

	    this.options = {
	      multiple: true,
	      theme: 'bootstrap',
	      closeOnSelect: false,
	      width: '100%'
	    };

	     this.selectedSubjects = [];

  	}



    get f() { 
    	return this.registerForm.controls; 

    }

    onSubmit() {
        this.submitted = true;
 
        if (this.registerForm.invalid) {
            return;
        }else{
        	console.log(this.registerForm.value);
        }

        
    }


}
