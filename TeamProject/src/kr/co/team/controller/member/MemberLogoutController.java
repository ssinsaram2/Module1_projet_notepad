package kr.co.team.controller.member;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import kr.co.team.controller.BackController;
import kr.co.team.service.IService;
import kr.co.team.service.member.MemberLogoutService;

public class MemberLogoutController implements BackController{
	
	IService service;
	
	public MemberLogoutController() {
		service=new MemberLogoutService();
	}
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) {
		
		try {
			response.setCharacterEncoding("utf-8");
			service.doService(request, response);
			HttpSession session=request.getSession(true);
			session.invalidate();
		}catch(Exception e){
			e.printStackTrace();
		}
	}

}
