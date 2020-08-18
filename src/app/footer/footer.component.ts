import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/services/data-service/local-storage.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router, private localSvc: LocalStorageService) { }

  ngOnInit(): void {
  }

  logout(){
    this.localSvc.logOut();
    this.router.navigate(['']);
  }

}
