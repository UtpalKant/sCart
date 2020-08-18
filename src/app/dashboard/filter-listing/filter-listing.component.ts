import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Filter } from 'src/models/filter.model';
import { CartService } from 'src/services/data-service/cart.service';
import { FilterData } from 'src/models/filter-data.model';

@Component({
  selector: 'app-filter-listing',
  templateUrl: './filter-listing.component.html',
  styleUrls: ['./filter-listing.component.css']
})
export class FilterListingComponent {

  @Input() filters: Filter[];
  filterData: FilterData;

  constructor(private cartSvc: CartService) {
    this.resetFilterData();
  };

  resetFilterData() {
    this.filterData = new FilterData();
    this.filterData.colors = [];
    this.filterData.brands = [];
    this.filterData.maxPrice = Number.POSITIVE_INFINITY;
    this.filterData.minPrice = 0;
  };

  ngOnInit() {
    this.processFilters();
  };

  updateList(value, filterType) {
    // point to BRANDS or COLORS array & perform operations
    const arrayRef = filterType === "BRAND" ? this.filterData.brands : this.filterData.colors;
    if (arrayRef && arrayRef.includes(value)) {
      arrayRef.splice(arrayRef.findIndex(e => e === value), 1);
    } else {
      arrayRef.push(value);
    }
  }

  setFilters(value, filterType) {
    switch (filterType) {
      case "BRAND": this.updateList(value, filterType);
        break;
      case "COLOUR": this.updateList(value, filterType);
        break;
    }
    this.updateFilters();
  }

  updateFilters() {
    this.cartSvc.getFilterData().emit(this.filterData);
  }

  // this is an extra step bcz filter data is not homogeneous type.
  processFilters(): void {
    for (let i = 0; i < this.filters.length; i++) {
      switch (this.filters[i].type) {
        case "PRICE": this.filters[i].values = this.filters[i].values.map(data => {
          return { title: data.displayValue, value: data.key };
        });
          break;
        case "COLOUR": this.filters[i].values = this.filters[i].values.map(data => {
          return { title: data.title, value: data.color };
        });
          break;
      }
    }
  };

}
