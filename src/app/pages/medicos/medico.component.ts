import { ModalUploadService } from './../../components/modal-upload/modal-upload.service';
import { Medico } from './../../models/medico.model';
import { Hospital } from './../../models/hospital.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HospitalService } from '../../services/hospital/hospital.service';
import { MedicoService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-medico',
    templateUrl: './medico.component.html',
    styles: []
})
export class MedicoComponent implements OnInit {

    hospitales: Hospital[] = [];
    medico: Medico = new Medico('', '', '', '', '');
    hospital: Hospital = new Hospital('');


    constructor(private _hospitalService: HospitalService,
        private _medicoService: MedicoService,
        private router: Router,
        public activatedRoute: ActivatedRoute,
        public _modalUpload: ModalUploadService) {

        activatedRoute.params.subscribe(params => {
            let id = params['id'];

            if (id != 'nuevo') {
                this.cargarMedico(id);
            }
        });
    }

    ngOnInit() {
        this._hospitalService.cargarHospitales().subscribe((resp: any) => this.hospitales = resp.hospitales);
        this._modalUpload.notificacion.subscribe(resp => {
            this.medico.img = resp.medico.img;
        })
    }

    public guardarMedico(f: NgForm) {
        if (f.valid) {

            this._medicoService.guardarMedico(this.medico).subscribe(medico => {
                this.medico._id = medico._id
                this.router.navigate(['/medico', medico._id])
            })

        }

    }
    cambioHospital(event) {
        let id = event.target.value;
        this._hospitalService.obtenerHospital(id).subscribe((hosp: any) => {
            this.hospital = hosp.hospital;
        })

    }

    cargarMedico(id: string) {
        this._medicoService.cargarMedico(id).subscribe((medico: any) => {
            this.medico = medico;
            this.hospital = medico.hospital;
            this.medico.hospital = this.hospital._id;
        });
    }

    cambiarFoto() {
        this._modalUpload.mostrarModal('medicos', this.medico._id);
    }
}
