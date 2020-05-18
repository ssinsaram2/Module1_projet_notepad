package kr.co.team.service.member;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import kr.co.team.service.IService;

public class MemberLogoutService implements IService {

	@Override
	public void doService(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		if(request.getParameter("type").equals("logout")) {
			;
		}
		
	}

}
