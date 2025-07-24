package lk.okidoki.repository;

import lk.okidoki.modal.Booking;
import lk.okidoki.modal.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;
import java.util.List;

public interface ReportRepository extends JpaRepository<Vehicle,Integer> {

//   vehicle count eka gnnw vehicle type eka anuwa
    @Query(value = "SELECT count(v.vehicle_type_id),(SELECT vt.name FROM tms.vehicle_type as vt where vt.id = v.vehicle_type_id) FROM tms.vehicle as v group by v.vehicle_type_id",nativeQuery = true)
    String[][] getCountByVehicleType();

//    booking count eka gnnw booking status eken
    @Query(value = "SELECT count(b.booking_status_id),(SELECT bs.status FROM tms.booking_status as bs where bs.id = b.booking_status_id) FROM tms.booking as b where month(b.pickup_date_time) = month(current_date()) group by b.booking_status_id ",nativeQuery = true)
    String[][] getCountByBookingStatus();

    //    booking count eka gnnw booking status eken
    @Query(value = "SELECT count(b.customer_id),(SELECT c.company_name FROM tms.customer as c where c.id = b.customer_id) FROM tms.booking as b where month(b.pickup_date_time) = month(current_date()) group by b.customer_id; ",nativeQuery = true)
    String[][] getBookingCountByCustomer();

    //    booking count eka gnnw booking status eken
    @Query(value = "SELECT round(sum(b.distance),2), monthname(delivery_date_time) FROM tms.booking as b group by monthname(b.delivery_date_time); ",nativeQuery = true)
    String[][] gettotalDistanceByMonthlyBookings();

    //    currenet monthvehicle revenue current month without attend/inprocess/cancel bookings
    @Query(value = "SELECT round(sum(b.distance),2),(SELECT v.vehicle_no FROM tms.vehicle as v where v.id=b.vehicle_id) FROM tms.booking as b  where b.booking_status_id not in (1,2,7) and month(b.pickup_date_time) = month(current_date()) and b.customer_id=?1 and b.vehicle_type_id=?2 group by b.vehicle_id; ",nativeQuery = true)
    String[][] getCurrentMonthVehicleRevenue(Integer customerId, Integer vehicleTypeId);

//    -------------------------------------booking Report-------------------------------------------------------------------------------

//    given date range
    @Query(value = "SELECT b FROM Booking b WHERE DATE(b.delivery_date_time) BETWEEN ?1 AND ?2")
    List<Booking> getBookingByDateRange(Date startdate, Date enddate);

//    ---------------------------------revenue license expire list report-------------------------------------------------------------------
    @Query(value = "SELECT * FROM tms.vehicle as v where v.revenu_license_expire_date< current_date() and v.vehicle_status_id=1",nativeQuery = true)
    List<Vehicle> getRevenueLicenseExpireList();

//    ---------------------------------insurance expire list report--------------------------------------------------------------------------

    @Query(value = "SELECT * FROM tms.vehicle as v where v.insurance_expire_date< current_date() and v.vehicle_status_id=1",nativeQuery = true)
    List<Vehicle> getInsuranceExpireList();

//    ______________________________count for vehicle dashboard report___________________________________________________________
    @Query(value = "SELECT count(v.id) FROM tms.vehicle as v where v.vehicle_status_id=1",nativeQuery = true)
    Integer getCountOfActiveVehicles();

    @Query(value = "SELECT count(v.id) FROM tms.vehicle as v ",nativeQuery = true)
    Integer getCountOfAllVehicles();

    @Query(value = "SELECT count(v.id) FROM tms.vehicle as v where v.revenu_license_expire_date< current_date() and v.vehicle_status_id=1",nativeQuery = true)
    Integer getCountOfRevenueLicenseExpireVehicles();

    @Query(value = "SELECT count(v.id) FROM tms.vehicle as v where v.insurance_expire_date< current_date() and v.vehicle_status_id=1",nativeQuery = true)
    Integer getCountOfInsuranceExpireVehicles();

//    ---------------------------------recently updated data for vehicle dashboard report---------------------------------------------------

    @Query(value = "SELECT * FROM tms.vehicle as v where v.revenu_license_expire_date< current_date() and v.vehicle_status_id=1 order by v.id desc limit 5", nativeQuery = true)
    List<Vehicle> getRecentlyUpdatedRevenueLicenseExpireVehicles();

    @Query(value = "SELECT * FROM tms.vehicle as v where v.insurance_expire_date< current_date() and v.vehicle_status_id=1 order by v.id desc limit 5", nativeQuery = true)
    List<Vehicle> getRecentlyUpdatedInsuranceExpireVehicles();

//    -------------------------------get vehicles revenue by customer id and vehicle type and group by currant month and currant year---------------------------
    @Query(value = "SELECT v.vehicle_no,sum(b.distance) as distance FROM tms.booking as b, tms.vehicle as v,tms.vehicle_type as vt where b.vehicle_id=v.id and v.vehicle_type_id=vt.id and b.customer_id=?1 and b.vehicle_type_id=?2 and v.id in (SELECT vghv.vehicle_id FROM tms.vehicle_group_has_vehicle as vghv where vghv.vehicle_group_id in(SELECT vg.id FROM tms.vehicle_group as vg where vg.customer_id =?1))and MONTH(b.pickup_date_time) = MONTH(CURDATE()) AND YEAR(b.pickup_date_time) = YEAR(CURDATE()) group by v.id", nativeQuery = true)
    List<Object[]> getVehiclesRevenueByCustomerIdAndVehicleTypeAndGroupByCurrantMonthAndYear(Integer customerId, Integer vehicleTypeId);

}
