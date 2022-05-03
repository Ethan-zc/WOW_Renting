package com.wow.rent.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import java.util.ArrayList;
import java.util.List;
/**
 * register for interceptor
 */
@Configuration
public class InterceptorRegister implements WebMvcConfigurer {

    @Bean
    public HandlerInterceptor getInterceptor() {
        return new UserInterceptor();
    }
    /**
     * Add interceptor
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        List<String> pathPatterns = new ArrayList<>();
        pathPatterns.add("/order/updateOrder");
        registry.addInterceptor(getInterceptor()).addPathPatterns(pathPatterns);
    }
}
