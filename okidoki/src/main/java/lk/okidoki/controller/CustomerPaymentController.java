package lk.okidoki.controller;

import lk.okidoki.modal.CustomerPayment;
import lk.okidoki.modal.Driver;
import lk.okidoki.repository.CustomerPaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
public class CustomerPaymentController{

    @Autowired
    private CustomerPaymentRepository customerPaymentRepository;
// get mapping for get booking ui(url --->/booking)
@GetMapping(value = "/customerpayment")
public ModelAndView loadCustomerPayment() {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();

    ModelAndView customerPaymentUi = new ModelAndView();
    customerPaymentUi.setViewName("customerPayment.html");
    customerPaymentUi.addObject("logedusername", auth.getName());
    return customerPaymentUi;

}

    // Request mapping for load all Driver data (url -->/driver/alldata)
    @GetMapping(value = "/customerpayment/alldata", produces = "application/json")
    public List<CustomerPayment> getAllCustomerPaymentData() {
        // Last added data eke Mulata ganna oni nisa thama find all eke sort attributr
        // eka use karanne
        return customerPaymentRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }
}
