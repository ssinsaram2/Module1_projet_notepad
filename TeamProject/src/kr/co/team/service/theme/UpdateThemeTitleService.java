package kr.co.team.service.theme;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.co.team.dao.ThemeMemberDAO;
import kr.co.team.listener.DAOManager;
import kr.co.team.service.IService;
import kr.co.team.vo.ThemeMemberVO;

public class UpdateThemeTitleService implements IService {
	@Override
	public void doService(HttpServletRequest request, HttpServletResponse response) throws Exception{
		ThemeMemberDAO themeMemberDAO=(ThemeMemberDAO)DAOManager.getDAO("ThemeMemberDAO");
		
		ThemeMemberVO themeMemberVO=new ThemeMemberVO();
		String memberID=(String)request.getSession().getAttribute("MemberID");
		
		if(memberID!=null) {
			int memberCode=(int)request.getSession().getAttribute("MemberCode");
			
			String theme=(String)request.getParameter("themeName");
			String superthemeName=(String)request.getParameter("superThemeName");
			System.out.println("1"+theme);
			themeMemberVO.setThemeMember_name(superthemeName);
			themeMemberVO.setMember_code(memberCode);
			

			if(themeMemberDAO.searchBythemeName(themeMemberVO)!=null) {
				request.setAttribute("message", "�̹� �ش� �׸��� ������ �ֽ��ϴ�.");

			}else {
				request.setAttribute("m	essage", "����Ǿ����ϴ�.");
				themeMemberDAO.updateThemeName(themeMemberVO,theme);
			}


			request.setAttribute("themeCode", "0");
		}else {
			request.setAttribute("themeCode", "1");
		}
	
	}
}
