package com.wow.rent.config;

import com.wow.rent.controller.AccountController;
import com.wow.rent.dao.AccountMapper;
import com.wow.rent.entry.AccountEntry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
/**
 * 拦截器
 */
public class UserInterceptor implements HandlerInterceptor {
    @Autowired
    private AccountMapper accountMapper;
    // before the controller method
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HttpSession session = request.getSession();
        // get session info
        AccountEntry sessionUser = (AccountEntry) session.getAttribute(AccountController.SESSION_NAME);
        // if no login, redirect to index.
        if (sessionUser == null) {
            response.sendRedirect("/");
            return false;
        }
        AccountEntry getUser = null;
        try {
            getUser = accountMapper.findAccountByAccName(sessionUser.getAccName());
        } catch (Exception e) {
            e.printStackTrace();
        }
        // if the session info is invalid, redirect to index.
        if (getUser == null || !getUser.getPwd().equals(sessionUser.getPwd())) {
            response.sendRedirect("/");
            return false;
        }
        return true;
    }
    //
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
    }
    //
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
    }
}
