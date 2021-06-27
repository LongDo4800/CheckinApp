package com.example.CheckInApi.exception;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.Map;

import static com.example.CheckInApi.utils.RespondUtil.error;

@ControllerAdvice
public class CheckinAppExceptionHandler {
    @ResponseBody
    @ExceptionHandler(ObjectNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> sitenerNotFoundHandler(ObjectNotFoundException ex){

        return error(ex.getMessage());
    }

}
