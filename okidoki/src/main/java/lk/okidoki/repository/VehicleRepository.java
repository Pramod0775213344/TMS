package lk.okidoki.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import lk.okidoki.modal.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {

    // data base eken vehicle no eka ganna query eka
    @Query(value = "select v from Vehicle v where v.vehicle_no = ?1")
    Vehicle getByVehicleNo(String vehicle_no);

    // supplier id eken vehicle ganna query eka
    @Query(value = "SELECT v FROM Vehicle v where v.supplier_id.id =?1")
    public List<Vehicle> getVehicleBySupplierId(Integer supplierid);

//    get vehicle by vehicle type and vehicle status
    @Query(value = "SELECT * FROM tms.vehicle as v where v.vehicle_type_id = ?1 and  v.vehicle_status_id = 1",nativeQuery = true)
    List<Vehicle> getVehicleByVehicleType(Integer vehicletypeid);
}
