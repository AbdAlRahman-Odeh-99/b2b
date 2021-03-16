import { Item } from './temp/Item';
import { Component, OnInit } from '@angular/core';
import stores from './temp/data';
import { element } from 'protractor';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.scss']
})
export class ShoppingCardComponent implements OnInit {

  //cart = stores;
  total: number;


  cartForm: FormGroup;

  items: FormArray = new FormArray([
    new FormGroup({ id: new FormControl(0), name: new FormControl('Desiree Singleton'), price: new FormControl(35.99), description: new FormControl('Id laborum fugiat tempor id fugiat adipisicing culpa non deserunt. Consectetur et est elit amet enim nisi excepteur dolor. Eiusmod mollit elit laborum tempor. Aute duis voluptate voluptate commodo qui laborum incididunt minim ex minim sint.\r\n'), quantity: new FormControl(5), picture: new FormControl('https://cdn.dumyah.com/image/cache/data/2020/07/15940392452063646764-800x800.jpg'), tags: new FormControl([
      'pariatur',
      'ea',
      'ea',
      'ea',
      'fugiat',
      'consequat',
      'incididunt'
      ])
    }),
    new FormGroup({ id: new FormControl(1), name: new FormControl('Buchanan Sandoval'), price: new FormControl(69.5), description: new FormControl('Ut consectetur dolore eiusmod reprehenderit non voluptate consectetur labore sunt. Lorem reprehenderit sunt ullamco et labore mollit laboris veniam aute ea. Eu quis aliqua cupidatat proident commodo nisi id. Fugiat nostrud nulla sint veniam sint eiusmod pariatur enim sunt do. Eu tempor pariatur sit ut amet laboris.\r\n'), quantity: new FormControl(2), picture: new FormControl('https://cdn.dumyah.com/image/cache/data/2020/07/15940392452063646764-800x800.jpg'), tags: new FormControl([
      'ea',
      'enim',
      'minim',
      'consectetur',
      'aliquip',
      'esse',
      'sint'
      ])
    }),
    new FormGroup({ id: new FormControl(2), name: new FormControl('Reese Cole'), price: new FormControl(115.4), description: new FormControl('Consectetur commodo adipisicing tempor aute nostrud reprehenderit reprehenderit occaecat incididunt aute exercitation aliquip labore irure. Nisi commodo ut pariatur labore et sint anim esse anim. Amet aliquip minim nostrud nostrud do esse amet adipisicing proident culpa ipsum proident. Laboris tempor ea labore cupidatat laboris ex commodo adipisicing ut sunt. Elit commodo laborum occaecat officia cupidatat dolor minim duis consequat.\r\n'), quantity: new FormControl(5), picture: new FormControl('https://cdn.dumyah.com/image/cache/data/2020/07/15940392452063646764-800x800.jpg'), tags: new FormControl([
      'aliquip',
      'in',
      'aliqua',
      'excepteur',
      'commodo',
      'ex',
      'Lorem'
      ])
    }),
    new FormGroup({ id: new FormControl(3), name: new FormControl('Desiree Singleton'), price: new FormControl(46.89), description: new FormControl('Id laborum fugiat tempor id fugiat adipisicing culpa non deserunt. Consectetur et est elit amet enim nisi excepteur dolor. Eiusmod mollit elit laborum tempor. Aute duis voluptate voluptate commodo qui laborum incididunt minim ex minim sint.\r\n'), quantity: new FormControl(1), picture: new FormControl('https://cdn.dumyah.com/image/cache/data/2020/07/15940392452063646764-800x800.jpg'), tags: new FormControl([
      'pariatur',
      'ea',
      'ea',
      'ea',
      'fugiat',
      'consequat',
      'incididunt'
      ])
    }),
    new FormGroup({ id: new FormControl(4), name: new FormControl('Desiree Singleton'), price: new FormControl(35.99), description: new FormControl('Id laborum fugiat tempor id fugiat adipisicing culpa non deserunt. Consectetur et est elit amet enim nisi excepteur dolor. Eiusmod mollit elit laborum tempor. Aute duis voluptate voluptate commodo qui laborum incididunt minim ex minim sint.\r\n'), quantity: new FormControl(1), picture: new FormControl('https://cdn.dumyah.com/image/cache/data/2020/07/15940392452063646764-800x800.jpg'), tags: new FormControl([
      'pariatur',
      'ea',
      'ea',
      'ea',
      'fugiat',
      'consequat',
      'incididunt'
      ])
    }),
    new FormGroup({ id: new FormControl(5), name: new FormControl('Buchanan Sandoval'), price: new FormControl(69.5), description: new FormControl('Ut consectetur dolore eiusmod reprehenderit non voluptate consectetur labore sunt. Lorem reprehenderit sunt ullamco et labore mollit laboris veniam aute ea. Eu quis aliqua cupidatat proident commodo nisi id. Fugiat nostrud nulla sint veniam sint eiusmod pariatur enim sunt do. Eu tempor pariatur sit ut amet laboris.\r\n'), quantity: new FormControl(1), picture: new FormControl('https://cdn.dumyah.com/image/cache/data/2020/07/15940392452063646764-800x800.jpg'), tags: new FormControl([
      'ea',
      'enim',
      'minim',
      'consectetur',
      'aliquip',
      'esse',
      'sint'
      ])
    }),
    new FormGroup({ id: new FormControl(6), name: new FormControl('Reese Cole'), price: new FormControl(115.4), description: new FormControl('Consectetur commodo adipisicing tempor aute nostrud reprehenderit reprehenderit occaecat incididunt aute exercitation aliquip labore irure. Nisi commodo ut pariatur labore et sint anim esse anim. Amet aliquip minim nostrud nostrud do esse amet adipisicing proident culpa ipsum proident. Laboris tempor ea labore cupidatat laboris ex commodo adipisicing ut sunt. Elit commodo laborum occaecat officia cupidatat dolor minim duis consequat.\r\n'), quantity: new FormControl(1), picture: new FormControl('https://cdn.dumyah.com/image/cache/data/2020/07/15940392452063646764-800x800.jpg'), tags: new FormControl([
      'aliquip',
      'in',
      'aliqua',
      'excepteur',
      'commodo',
      'ex',
      'Lorem'
      ])
    }),
    new FormGroup({ id: new FormControl(7), name: new FormControl('Desiree Singleton'), price: new FormControl(46.89), description: new FormControl('Id laborum fugiat tempor id fugiat adipisicing culpa non deserunt. Consectetur et est elit amet enim nisi excepteur dolor. Eiusmod mollit elit laborum tempor. Aute duis voluptate voluptate commodo qui laborum incididunt minim ex minim sint.\r\n'), quantity: new FormControl(1), picture: new FormControl('https://cdn.dumyah.com/image/cache/data/2020/07/15940392452063646764-800x800.jpg'), tags: new FormControl([
      'pariatur',
      'ea',
      'ea',
      'ea',
      'fugiat',
      'consequat',
      'incididunt'
      ])
    })
  ]);

  constructor(private formBuilder: FormBuilder) { 
  }

  ngOnInit(): void {
    this.cartForm = this.formBuilder.group({
      items: this.items
    });
    this.total = this.calculateTotal();
  }

  calculateTotal(){
    let total = 0;
    for(let i=0; i < ((this.cartForm.get('items') as FormArray).length); i++){
      total += ((this.cartForm.get('items') as FormArray).at(i).get('quantity').value * (this.cartForm.get('items') as FormArray).at(i).get('price').value);
    }
    return total;

  }

  add(i: any){
    let q = (this.cartForm.get('items') as FormArray).at(i).get('quantity').value;
    (this.cartForm.get('items') as FormArray).at(i).get('quantity').setValue(q + 1);
    this.total = this.calculateTotal(); 
  }

  minus(i: any){
    let q = (this.cartForm.get('items') as FormArray).at(i).get('quantity').value;
    (this.cartForm.get('items') as FormArray).at(i).get('quantity').setValue(q - 1);
    this.total = this.calculateTotal(); 
  }

  remove(i: any){
    (this.cartForm.get('items') as FormArray).removeAt(i);
    this.total = this.calculateTotal();
  }


  get itemsArray() : FormArray {
    return this.cartForm.get("items") as FormArray;
  }

  onSubmit(){
    console.log((this.cartForm.get('items') as FormArray));
  }

}
