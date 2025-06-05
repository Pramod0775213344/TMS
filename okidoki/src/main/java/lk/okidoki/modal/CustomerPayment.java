package lk.okidoki.modal;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
// mema class eka entity ekak widihata hasirila Table eka ekka mapping eka hadanne entity anotation eka dammoth witharai
@Table(name = "customer_payment")// Table Mapping eka

@Data //setters and getters create karaganna
@NoArgsConstructor// all arguemrnt constructor eka generate wenawa
@AllArgsConstructor//Empty constructor eka generate wenawa
public class CustomerPayment {

    @Id //primary key eka nisa
    @GeneratedValue(strategy = GenerationType.IDENTITY) //auto increment nisa
    private Integer id;

    @NotNull
    private String bill_no;

    @NotNull
   private BigDecimal total_amount;
    @NotNull
    private BigDecimal due_amount ;

    private BigDecimal current_payment;

    private String method ;

    @NotNull
    private LocalDateTime added_datetime;

    @NotNull
    private Integer added_user_id ;

    private BigDecimal balance_amount ;

    @ManyToOne()
    @JoinColumn(name = "customer_agreement_id",referencedColumnName = "id")
    private CustomerAgreement customer_agreement_id;
}
