package huydqpc07859.firstproject.services.admin;

import huydqpc07859.firstproject.model.admin.ConfigAdmin;
import huydqpc07859.firstproject.payload.admin.AdminRequest;
import huydqpc07859.firstproject.repositories.AdminRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AdminService {
    private final AdminRepository adminRepository;

    public void config(AdminRequest request) {
        ConfigAdmin config = adminRepository.findById(1L)
                .orElseGet(() ->
                    adminRepository.save(new ConfigAdmin(1L))
                );

        config.setQuantityOfBestSeller(request.getQuantityOfBestSeller());
        adminRepository.save(config);
    }

    public ConfigAdmin getConfig(){
        return adminRepository.findById(1L)
                .orElseGet(() ->
                        adminRepository.save(new ConfigAdmin(1L))
                );
    }
}
