package com.example.demo.service.implementation;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class TwilioService {

    @Value("${twilio.accountSid}")
    private String accountSid;

    @Value("${twilio.authToken}")
    private String authToken;

    public void sendWhatsAppMessage(String toPhoneNumber, String message) {
        Twilio.init(accountSid, authToken);

        PhoneNumber from = new PhoneNumber("+1 254 536 3466");
        PhoneNumber to = new PhoneNumber(toPhoneNumber);

        Message.creator(to, from, message).create();
    }
}

