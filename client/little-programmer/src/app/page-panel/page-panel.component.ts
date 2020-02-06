import {Component, Input, OnInit} from '@angular/core';
import {SharedService} from "../SharedService";

@Component({
  selector: 'app-page-panel',
  templateUrl: './page-panel.component.html',
  styleUrls: ['./page-panel.component.css']
})
export class PagePanelComponent implements OnInit {

  @Input() public amountOfPages: number;
  @Input() public buttonValue: string;
  @Input() public changePageCallback: (pageNo: number) => {};
  private currentPageNo = 0;

  constructor(private sharedService: SharedService) {
  }

  ngOnInit() {
  }

  public onNext() {
    if (this.shouldChangePage(this.currentPageNo + 1)) {
      this.currentPageNo++;
      this.changePageCallback(this.currentPageNo);
    } else {
      if (this.currentPageNo < 0) {
        this.currentPageNo = 1;
      }
    }
  }

  public onPrev() {
    if (this.shouldChangePage(this.currentPageNo - 1)) {
      this.currentPageNo--;
      this.changePageCallback(this.currentPageNo);
    } else {
      if (this.currentPageNo >= this.amountOfPages) {
        this.currentPageNo = this.amountOfPages - 2;
      }
    }
  }

  private shouldChangePage(value: number): boolean {
    return value >= 0 && value < this.amountOfPages;
  }

  public shouldGoForward(): boolean {
    return this.currentPageNo + 1 < this.amountOfPages;
  }

  public shouldGoBack(): boolean {
    return this.currentPageNo - 1 >= 0;
  }

  public onClick() {
    this.sharedService.closePopUp();
  }
}
