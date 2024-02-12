package huydqpc07859.firstproject.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommonResponse {
    private String status;
    private String message;
    private Object data;

    public CommonResponse(Object data) {
        this.status = "ok";
        this.message = "";
        this.data = data;
    }

    public CommonResponse(String status, String message){
        this.status = status;
        this.message = message;
    }
}
