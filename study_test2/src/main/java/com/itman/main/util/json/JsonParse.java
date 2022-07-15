package com.itman.main.util.json;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StringWriter;
import java.io.Writer;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.json.simple.JSONObject;
import org.json.simple.JSONValue;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;

public class JsonParse {
	private StringBuilder url;
	private String USER_AGENT;
	
	public JsonParse (String url, String serviceKey) {
		USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36";
		this.url = new StringBuilder(url);
		this.url.append("?" + "serviceKey" + "=" + serviceKey);
	}
	// 공공데이터 api에서 제공하는 파라미터 값 추가
	public void addParams(String name, String val) {
		this.url.append("&" + name + "=" + val);
	}
	// url로부터 json 데이터를 파싱하여 JSONObject 형태로 반환함
	public List<JSONObject> getJson(int start, int end) throws IOException {
		List<JSONObject> jList = new ArrayList<JSONObject>();
		StringBuilder buf = new StringBuilder();
		int index = 0;
		
		for(int i = 0; i < (end-start)+1; i++) {
			index = start + i;
			buf.append("&" + "page" + "=" + index);
			this.url.append(buf);
			URL url = new URL(this.url.toString());
			//System.out.println(this.url.toString());
			
			HttpURLConnection connection = (HttpURLConnection) url.openConnection();
			connection.setRequestMethod("GET");
			connection.setRequestProperty("User-Agent", USER_AGENT);
			
			Object obj = JSONValue.parse(new InputStreamReader(connection.getInputStream()));
			
			// page 파라미터 초기화
			this.url.setLength((this.url.length()-buf.length()));
			buf.setLength(0);
			
			JSONObject jObj = (JSONObject) obj;
			
			if(jObj.get("data") != null) {
				jList.add(jObj);
			}
		}
		
		return jList;
	}
	public JSONObject getJson() throws IOException {
		List<JSONObject> jList = getJson(1,1);
		return jList.get(0);
	}
	
	// url로부터 xml 데이터를 파싱하고 String 형태로 바꿔 반환함
	public String getXml() throws IOException, SAXException, ParserConfigurationException, TransformerException {
		
		URL url = new URL(this.url.toString() + "&returnType=XML");
		
		HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		connection.setRequestMethod("GET");
		connection.setRequestProperty("User-Agent", USER_AGENT);
		
		DocumentBuilderFactory dbFactoty = DocumentBuilderFactory.newInstance();
		DocumentBuilder dBuilder = dbFactoty.newDocumentBuilder();
		Document doc = dBuilder.parse(connection.getInputStream());
		
		//XML을 Strig으로 변환
		Transformer tf = TransformerFactory.newInstance().newTransformer();
		tf.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
		tf.setOutputProperty(OutputKeys.INDENT, "yes");
		Writer out = new StringWriter();
		tf.transform(new DOMSource(doc), new StreamResult(out));
		
		return out.toString();
	}
}
