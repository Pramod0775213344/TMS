package lk.okidoki.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import lk.okidoki.modal.Customer;
import lk.okidoki.modal.CustomerAgreement;
import lk.okidoki.modal.Package;
import lk.okidoki.modal.VehicleType;

public interface CustomerAgreementRepository extends JpaRepository<CustomerAgreement, Integer> {

    // next customer agrement_reg_no eka create ganna query eka
    @Query(value = "SELECT concat('AGR', lpad(substring(max(ca.cus_agreement_no),4)+1,5,0)) FROM tms.customer_agreement as ca", nativeQuery = true)
    public String getNextAgreementNo();

    // customer agreement eka vehicle type eka package eka select karanna query eka
    @Query(value = "SELECT ca FROM CustomerAgreement ca where  ca.customer_id =?1 and ca.vehicle_type_id =?2 and ca.package_id =?3")
    public CustomerAgreement getByVehicleTypeAndPackageType(Customer customer_id, VehicleType vehicle_type_id,
            Package package_id);

    // customer agreement eka status eka pending thiyen ewa  select karanna query eka
    @Query(value = "SELECT * FROM tms.customer_agreement as ca where ca.customer_agreement_status_id = 1 order by ca.id desc", nativeQuery = true)
    public List<CustomerAgreement> getCustomerAgreementByStatus();

    @Query(value = "SELECT * FROM tms.customer_agreement as ca where ca.customer_id = ?1 and ca.vehicle_type_id = ?2",nativeQuery = true)
    public CustomerAgreement findByVehicleTypeIdAndCustomerId(Integer customer_id, Integer VejicleType_id);

//    @Query(value = "SELECT * FROM tms.customer_agreement as ca where ca.vehicle_type_id = ?1 and ca.",nativeQuery = true)
//    CustomerAgreement getByVehicleType(Integer vehicleTypeId);
}
