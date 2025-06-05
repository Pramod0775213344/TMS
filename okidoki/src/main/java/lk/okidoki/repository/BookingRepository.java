package lk.okidoki.repository;

import lk.okidoki.modal.Booking;
import lk.okidoki.modal.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Integer> {

//get booking number using company name and  year and
    @Query(value = "SELECT concat(concat(upper(substring(substring_index(company_name, ' ' , 1),1,1)),IF(LOCATE(' ', company_name) > 0, upper(substring(substring_index(substring_index(company_name, ' ' , 2),' ',-1),1,1)), ''),IF(LOCATE(' ', company_name, LOCATE(' ', company_name) + 1) > 0, upper(substring(substring_index(substring_index(company_name, ' ' , 3),' ',-1),1,1)), ''),IF(LOCATE(' ', company_name, LOCATE(' ', company_name, LOCATE(' ', company_name) + 1) + 1) > 0,upper(substring(substring_index(substring_index(company_name, ' ' , 4),' ',-1),1,1)), ''),RIGHT(YEAR(CURDATE()), 2)),lpad(substring( max(b.booking_no),6)+1,5,0)) FROM tms.booking as b inner join tms.customer on b.customer_id = tms.customer.id group by customer_id", nativeQuery = true)
    String getNextBookingNo();

//    get booking by status(inprocess)
    @Query(value = "SELECT * FROM tms.booking as b where b.booking_status_id = 1",nativeQuery = true)
    List<Booking> getByStatus();

//    get vehicl deatils
    @Query(value = "SELECT * FROM tms.booking as b where b.vehicle_id =?1",nativeQuery = true)
    Booking getByVehicleNo(Integer vehicleId);

//    get driver details
    @Query(value = "SELECT * FROM tms.booking as b where b.driver_id =?1",nativeQuery = true)
    Booking getDriver(Integer driverId);

    //    get booking by status(departed from delivery)
    @Query(value = "SELECT * FROM tms.booking as b where b.booking_status_id = 6",nativeQuery = true)
    List<Booking> getByDepartedFromDeliveryStatus();

//    get bookings by given customer id and copleted bookings
    @Query(value = "SELECT * FROM tms.booking as b where b.customer_id = ?1 and b.booking_status_id = 6",nativeQuery = true)
    List<Booking> getBookingByCustomer(Integer customerid);
}
