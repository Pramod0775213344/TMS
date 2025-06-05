package lk.okidoki.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import lk.okidoki.modal.CustomerAgreement;
import lk.okidoki.modal.User;
import lk.okidoki.repository.CustomerAgreementRepository;
import lk.okidoki.repository.CustomerAgreementStatusRepository;
import lk.okidoki.repository.UserRepository;


@RestController
public class CustomerAgreementApprovalController {

    @Autowired
    private CustomerAgreementRepository customerAgreementRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerAgreementStatusRepository customerAgreementStatusRepository;

    // Request mapping for load customeragreement Ui (url
    // -->/customeragreement/approve)
    @RequestMapping(value = "/customeragreementapprove")
    public ModelAndView loadCustomerAgreementApprovalUI() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        ModelAndView customerAgreementApprovalUI = new ModelAndView();
        customerAgreementApprovalUI.setViewName("customerAgreementApproval.html");
        customerAgreementApprovalUI.addObject("logedusername", auth.getName());
        return customerAgreementApprovalUI;
    }



    // Get mapping for get pending all customer agreement data by (url
    // -->/customeragreementapprove/bycustomeragreementstatusid?customeragreementstatusid=1)
    @RequestMapping(value="/customeragreementapprove/bycustomeragreementstatusid",produces = "application/json")
    public List<CustomerAgreement> getCustomerAgreementByStatus() {
        return customerAgreementRepository.getCustomerAgreementByStatus();
    }
    



    // Requset put mapping for approve customer agreement approve from the table(url
    // -->/customeragreementapprove/update)
    @PutMapping(value = "/customeragreementapprove/update")
    public String aprroveCustomerAgreement(@RequestBody CustomerAgreement customerAgreement) {
        // check authentication and authorization
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User logedUser = userRepository.getByUsername(auth.getName());

        // check existing
        if (customerAgreement.getId() == null) {
            return "Approval Not Completed : Agreement No Found";
        }
        // database eke thiyenwd balanna oni
        CustomerAgreement extCustomerAgreement = customerAgreementRepository
                .getReferenceById(customerAgreement.getId());
        if (extCustomerAgreement == null) {
            return "Approval Not Completed : Agreement No Not Found";

        }

        try {
            // set default values
            customerAgreement.setUpdated_datetime(LocalDateTime.now());
            customerAgreement.setUpdated_user_id(logedUser.getId());
            // set status to deleted
            customerAgreement.setCustomer_agreement_status_id(customerAgreementStatusRepository.getReferenceById(2));

            // save data
            customerAgreementRepository.save(customerAgreement);

            // return success message
            return "ok";
        } catch (Exception e) {
            return "Approval Not Completed :" + e.getMessage();
        }

    }



    
    // Requset put mapping for reject customer agreement approve from the table(url
    // -->/customeragreementapprove/reject)
    @PutMapping(value = "/customeragreementapprove/reject")
    public String rejectCustomerAgreement(@RequestBody CustomerAgreement customerAgreement) {
        // check authentication and authorization
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User logedUser = userRepository.getByUsername(auth.getName());

        // check existing
        if (customerAgreement.getId() == null) {
            return "Reject Not Completed : Agreement No Found";
        }
        // database eke thiyenwd balanna oni
        CustomerAgreement extCustomerAgreement = customerAgreementRepository
                .getReferenceById(customerAgreement.getId());
        if (extCustomerAgreement == null) {
            return "Reject Not Completed : Agreement No Not Found";

        }

        try {
            // set default values
            customerAgreement.setUpdated_datetime(LocalDateTime.now());
            customerAgreement.setUpdated_user_id(logedUser.getId());
            // set status to deleted
            customerAgreement.setCustomer_agreement_status_id(customerAgreementStatusRepository.getReferenceById(5));

            // save data
            customerAgreementRepository.save(customerAgreement);

            // return success message
            return "ok";

        } catch (Exception e) {

            return "Reject Not Completed :" + e.getMessage();
        }

    }

}
