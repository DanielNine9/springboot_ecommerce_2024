package huydqpc07859.firstproject.advices;

import huydqpc07859.firstproject.payload.CommonResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionHandlerController {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<CommonResponse> ReponseRuntimeException(MethodArgumentNotValidException ex) {
        ex.printStackTrace();
        StringBuilder stringBuilder = new StringBuilder();
        for(ObjectError error : ex.getBindingResult().getAllErrors()){
            stringBuilder.append(error.getDefaultMessage());
            stringBuilder.append(", ");
        }
        return ResponseEntity.ok().body(new CommonResponse("failed", stringBuilder.toString()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<CommonResponse> ResponseException(Exception ex){
        ex.printStackTrace();
        return ResponseEntity.ok().body(new CommonResponse("failed", ex.getMessage()));
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<CommonResponse> BadCredentialsResponse(Exception ex){
        ex.printStackTrace();
        return ResponseEntity.ok().body(new CommonResponse("failed", "Username or password is not correct"));
    }

}


