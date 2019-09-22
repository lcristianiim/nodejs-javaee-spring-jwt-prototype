package oauth2.security;

import org.apache.catalina.connector.ResponseFacade;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CustomFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) servletRequest;

        ((ResponseFacade) servletResponse).addHeader("Access-Control-Allow-Origin","*");
        ((ResponseFacade) servletResponse).addHeader("Access-Control-Allow-Headers","www-authenticate, authorization");

        if("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            ((ResponseFacade) servletResponse).setStatus(200);

        } else {
            filterChain.doFilter(request, servletResponse);
        }
    }

    @Override
    public void destroy() {
    }
}
