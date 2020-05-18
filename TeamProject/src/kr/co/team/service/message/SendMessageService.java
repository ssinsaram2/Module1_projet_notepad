package kr.co.team.service.message;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.co.team.dao.GroupToMemberListDAO;
import kr.co.team.dao.MessageDAO;
import kr.co.team.listener.DAOManager;
import kr.co.team.service.IService;
import kr.co.team.vo.MessageVO;

public class SendMessageService implements IService{
	@Override
	public void doService(HttpServletRequest request, HttpServletResponse response) throws Exception{
		 

		 
		MessageDAO messageDAO =(MessageDAO)DAOManager.getDAO("MessageDAO");
		GroupToMemberListDAO groupToMemberListDAO = (GroupToMemberListDAO)DAOManager.getDAO("GroupToMemberListDAO"); 
		
		String memberID = (String)request.getSession().getAttribute("MemberID");
		int code = (int)request.getSession().getAttribute("MemberCode");
		
		String receiverID = (String)request.getParameter("receiverID");
		
		String groupName = (String)request.getParameter("groupName");
		
		if(request.getParameter("type").equals("invite")) {
			String inviteMessage = null;
			inviteMessage = "<div id='invite' ><ul><li>'"+memberID+"'��'"+groupName+"'�׷쿡 �ʴ��Ͽ����ϴ� </li></ul><ul><li><button type='button' id='inviteAcceptBtn'>����</button><button type='button' id='inviteRefuseBtn'>����</button></li></ul></div>";
			if(request.getParameter("receiverID").equals(memberID)) { //�� �ڽ��� �ʴ��ϴ°��̶��
				request.setAttribute("yesno", "no");
			}
			else { //������ �ʴ��ϴ°��̶��
				messageDAO.insert(receiverID, code, inviteMessage);
				request.setAttribute("yesno", "yes");
			}
		}
		else if(request.getParameter("type").equals("normal")) {
			
			String messageContent = (String)request.getParameter("content");
			if(!memberID.equals(receiverID)) {
				messageDAO.insert(receiverID, code ,messageContent);
				
			}
			else {
				messageDAO.insert(code, messageContent);
			}
			request.setAttribute("yesno", "yes");
			
		} 
		else if(request.getParameter("type").equals("request")) {
			String requestMessage = null;
			requestMessage = "<div id='rrequest' ><ul><li>'"+memberID+"'�� '"+groupName+"'�׷쿡 ������ ��û�Ͽ����ϴ�</li></ul><ul><li><button type='button' id='requestAcceptBtn'>����</button><button type='button' id='requestRefuseBtn'>����</button></li></ul></div>";
			if(request.getParameter("receiverID").equals(memberID)) { // �׷����� �ڽ��� �׷쿡 ���Կ�û�� �ڱ��ڽ��϶�
				request.setAttribute("yesno", "no");
			}
			else { //�׷����� �ٸ������ �׷쿡 ���������� ���Կ�û�� �Ҷ�
				messageDAO.insert(receiverID, code, requestMessage);
				request.setAttribute("yesno", "yes");
			}
		}
		
		
		//������ ����/���� �޼����� �޾Ҵٴ� �����Ͽ�.
		else if(request.getParameter("type").equals("inviteAccept")){ //�ʴ�޼����� ���ؼ� ������ư ������ ���
			int messageCode = Integer.parseInt(request.getParameter("messageCode"));
			String myInviteAcceptMessage = "<div id='myInviteAccept'><ul><li>'"+receiverID+"'��'"+groupName+"'�׷쿡 �����Ͽ����ϴ� </ul></div>"; //���������� ���� �ٲ�� �޼���
			String partnerInviteAcceptMessage = "<div id='partnerInviteAccept'><ul><li>'"+memberID+"'����'"+groupName+"'�׷쿡 �����Ͽ����ϴ� </ul></div>"; //����������� �������� ���¸޼���
			
			groupToMemberListDAO.insert_a(groupName, code, receiverID); //����Ʈ�� �߰�
			
			messageDAO.update(messageCode, myInviteAcceptMessage); //������ �޼��� ������Ʈ ����/���� ��ư �������
			messageDAO.insert(receiverID,code,partnerInviteAcceptMessage); //�������� ���� �޼��� '~���� �����Ͽ����ϴ�'
			request.setAttribute("inviteAccept", "yes");
			
		}
		else if(request.getParameter("type").equals("inviteRefuse")) { //�ʴ�޼����� ���ؼ� �źι�ư ���������
			int messageCode = Integer.parseInt(request.getParameter("messageCode"));
			String myInviteRefuseMessage = "<div id='myInviteRefuse'><ul><li>'"+receiverID+"'��'"+groupName+"'�׷쿡 �ź��Ͽ����ϴ� </ul></div>"; // �ź������� ���� �ٲ�� �޼���
			String partnerInviteRefuseMessage ="<div id='partnerInviteRefuse'><ul><li>'"+memberID+"'����'"+groupName+"'�׷쿡 �ź��Ͽ����ϴ� </ul></div>";  //�ź������� ���沨 ���� �޼���
			
			messageDAO.update(messageCode, myInviteRefuseMessage);
			messageDAO.insert(receiverID, code,partnerInviteRefuseMessage);
			request.setAttribute("inviteAccept", "no");
		
		}
		
		else if(request.getParameter("type").equals("requestAccept")) { //��û�� ���ؼ� �����������
			int messageCode = Integer.parseInt(request.getParameter("messageCode"));
			String myRequestAceeptMessage = "<div id='myRequestAccept'><ul><li>'"+receiverID+"'��'"+groupName+"'�׷��û�� �����Ͽ����ϴ� </ul></div>";
			String partnerRequestRefuseMessage = "<div id='partnerRequestAccept'><ul><li>'"+memberID+"'����'"+groupName+"'�׷쿡 �����ϴ� </ul></div>";
			System.out.println(groupName);
			System.out.println(receiverID);
			System.out.println(code);
			groupToMemberListDAO.insert_b(groupName, receiverID, code); //����Ʈ�� �߰�
			
			messageDAO.update(messageCode, myRequestAceeptMessage);
			messageDAO.insert(receiverID, code, partnerRequestRefuseMessage);
			request.setAttribute("requestAccept", "yes");
		}
		else if(request.getParameter("type").equals("requestRefuse")) { //��û�� ���ؼ� �ź��������
			int messageCode = Integer.parseInt(request.getParameter("messageCode"));
			String myRequestRefuseMessage = "<div id='myRequestRefuse'><ul><li>'"+receiverID+"'��'"+groupName+"'�׷��û�� �����Ͽ����ϴ� </ul></div>";
			String partnerRequestRefuseMessage = "<div id='partnerRequestRefuse'><ul><li>'"+memberID+"'����'"+groupName+"'�׷쿡 �������Ͽ����ϴ� </ul></div>";
			
			messageDAO.update(messageCode, myRequestRefuseMessage);
			messageDAO.insert(receiverID, code, partnerRequestRefuseMessage);
			request.setAttribute("requestAccept", "no");
		}
	}
}
