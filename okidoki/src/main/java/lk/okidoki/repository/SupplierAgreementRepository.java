package lk.okidoki.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import lk.okidoki.modal.SupplierAgreement;
import lk.okidoki.modal.Vehicle;

import java.util.List;

public interface SupplierAgreementRepository extends JpaRepository<SupplierAgreement, Integer> {

    @Query("SELECT s FROM SupplierAgreement s WHERE s.vehicle_id = ?1")
    SupplierAgreement getByVehicelNo(Vehicle vehicle_id);

    // next supplier agrement_reg_no eka create ganna query eka
    @Query(value = "SELECT concat('SUP', lpad(substring(max(sa.sup_agreement_no),4)+1,5,0)) FROM tms.supplier_agreement as sa", nativeQuery = true)
    String getNextSupplierAgreementNo();

    // supplier agreement eka status eka pending thiyen ewa  select karanna query eka
    @Query(value = "SELECT * FROM tms.supplier_agreement as sa where sa.supplier_agreement_status_id = 1 order by sa.id desc", nativeQuery = true)
    public List<SupplierAgreement> getSupplierAgreementByStatus();

//    get supplier by supplier agreement
    @Query(value = "SELECT sg.supplier_id FROM tms.supplier_agreement as sg where sg.supplier_agreement_status_id = 2 ",nativeQuery = true)
    public String getSupplierBySupplierAgreementStatus();
}
