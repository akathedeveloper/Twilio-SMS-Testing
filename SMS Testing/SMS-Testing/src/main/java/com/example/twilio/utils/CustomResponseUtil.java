package com.example.twilio.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.twilio.model.CustomResponse;

public class CustomResponseUtil {
    public static <T> ResponseEntity<CustomResponse<T>> createResponse(HttpStatus status, T data, String message, String error){
        CustomResponse<T> response = new CustomResponse<>();
        response.setStatus(status.getReasonPhrase());
        response.setStatusCode(status.value());
        response.setData(data);
        response.setMessage(message);
        response.setError(error);

        return new ResponseEntity<>(response, status);
    }

    public static <T> ResponseEntity<CustomResponse<T>> createSuccessResponse(T data, String message) {
        return createResponse(HttpStatus.OK, data, message, null);
    }

    public static <T> ResponseEntity<CustomResponse<T>> createErrorResponse(HttpStatus status, String error, String message) {
        return createResponse(status, null, message, error);
    }

}
