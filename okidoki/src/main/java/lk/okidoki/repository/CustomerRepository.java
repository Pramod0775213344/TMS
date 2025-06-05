package lk.okidoki.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import lk.okidoki.modal.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

  // next customer_reg_no eka create ganna query eka
    @Query(value = "SELECT concat('CUS', lpad(substring(max(e.customer_reg_no),4)+1,5,0)) FROM tms.customer as e", nativeQuery = true)
    public String getNextCustomerRegNo();

     // direct_telephone_no eke details database eken ganna query eka
    @Query(value = "select e from Customer e where e.direct_telephone_no = ?1")
    public Customer getByTelephoneNo(String direct_telephone_no);

     // direct_email_no eke details database eken ganna query eka
    @Query(value = "select e from Customer e where e.direct_email_no = ?1")
    public Customer getByEmail(String direct_email_no);

     // contact_person_mobileno eke details database eken ganna query eka
    @Query(value = "select e from Customer e where e.contact_person_mobileno = ?1")
    public Customer getByContactPersonTelephoneNo(String contact_person_mobileno);

     // contact_person_email eke details database eken ganna query eka
    @Query(value = "select e from Customer e where e.contact_person_email = ?1")
    public Customer getByContactPersonEmail(String contact_person_email);

      // customer status id eke details database eken ganna query eka
      @Query(value = "SELECT c FROM Customer c where c.customer_status_id.id = 1")
    public List<Customer> getCustomerByCustomerStatus();

      @Query(value = "SELECT * FROM tms.customer as c where c.id in (SELECT ca.customer_id FROM tms.customer_agreement as ca where ca.customer_agreement_status_id = 2)",nativeQuery = true)
    public List<Customer> getCustomerByAgreement();

}
