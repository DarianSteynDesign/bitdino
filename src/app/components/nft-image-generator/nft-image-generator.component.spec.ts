import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftImageGeneratorComponent } from './nft-image-generator.component';

describe('NftImageGeneratorComponent', () => {
  let component: NftImageGeneratorComponent;
  let fixture: ComponentFixture<NftImageGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftImageGeneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftImageGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
