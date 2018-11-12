import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponentModal } from './edit-component-modal.component';

describe('EditComponentModalComponent', () => {
    let component: EditComponentModal;
    let fixture: ComponentFixture<EditComponentModal>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditComponentModal]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditComponentModal);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
