package huydqpc07859.firstproject;

import huydqpc07859.firstproject.configurations.AppProperties;
import huydqpc07859.firstproject.model.category.ProductCategory;
import huydqpc07859.firstproject.model.category.Variation;
import huydqpc07859.firstproject.model.category.VariationOption;
import huydqpc07859.firstproject.model.product.Product;
import huydqpc07859.firstproject.model.product.ProductItem;
import huydqpc07859.firstproject.model.user.AuthProvider;
import huydqpc07859.firstproject.model.user.Role;
import huydqpc07859.firstproject.model.user.User;
import huydqpc07859.firstproject.repositories.CategoryRepository;
import huydqpc07859.firstproject.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
@AllArgsConstructor
@CrossOrigin( origins = {"http://localhost:3000"})
public class EcommerceApplication {
	private final UserRepository userRepository;
	private final CategoryRepository categoryRepository;

	public static void main(String[] args) {
		SpringApplication.run(EcommerceApplication.class, args);
	}

	@PostConstruct
	public void init() {
		// Check if admin user exists
		if (!userRepository.existsByEmail("admin@gmail.com")) {
			PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
			User user = User.builder()
					.email("admin@gmail.com")
					.password(passwordEncoder.encode("12341234"))
					.enabled(true)
					.role(Role.ADMIN)
					.provider(AuthProvider.local)
					.build();
			userRepository.save(user);
		}
		if(!categoryRepository.existsByName("Phone")){
			ProductCategory phone = ProductCategory.builder()
					.name("Phone")
					.products(new ArrayList<>())
					.variations(new ArrayList<>())
					.deleted(false)
					.imageUrl("http://localhost:8080/api/images/7d9972e4949047589b669d7d6d8a8c2e.png")
					.build();
			ProductCategory laptop = ProductCategory.builder()
					.name("Laptop")
					.products(new ArrayList<>())
					.variations(new ArrayList<>())
					.deleted(false)
					.imageUrl("http://localhost:8080/api/images/7d9972e4949047589b669d7d6d8a8c2e.png")
					.build();

			Product iphone = Product.builder()
					.productItems(new ArrayList<>())
					.deleted(false)
					.description("Iphone 15 description")
					.name("Iphone 15")
					.imageUrl("image")
					.productCategory(phone)
					.build();

			Product acer = Product.builder()
					.productItems(new ArrayList<>())
					.deleted(false)
					.description("Acer description")
					.name("Acer")
					.imageUrl("image")
					.productCategory(laptop)
					.build();

			Variation var1 = Variation.builder()
					.name("var1")
					.productCategory(phone)
					.variationOptions(new ArrayList<>())
					.build();

			Variation var2 = Variation.builder()
					.name("var2")
					.productCategory(phone)
					.variationOptions(new ArrayList<>())
					.build();

			VariationOption varO1 = VariationOption.builder()
					.value("value1")
					.variation(var1)
					.productItems(new ArrayList<>())
					.build();
			VariationOption varO2 = VariationOption.builder()
					.value("value2")
					.variation(var1)
					.productItems(new ArrayList<>())
					.build();
			List<VariationOption> varOList = List.of(varO1, varO2);


			ProductItem item1 = ProductItem.builder()
					.quantity(10)
					.imageUrl("imageUrl")
					.product(iphone)
					.variationOptions(varOList)
					.build();
			varOList.forEach(varO -> varO.getProductItems().add(item1));
			iphone.getProductItems().add(item1);
			var1.getVariationOptions().addAll(List.of(varO1,varO2));
			phone.getProducts().add(iphone);
			phone.getVariations().add(var1);
			phone.getVariations().add(var2);

			laptop.getProducts().add(acer);
			List<ProductCategory> list = List.of(phone, laptop);
			categoryRepository.saveAll(list);
		}
	}
}
