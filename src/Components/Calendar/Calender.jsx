import React, { useState, useRef, useEffect } from "react";
import "./custom.module.css";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input,
  Container
} from "reactstrap";
import Select from "react-select";
import DateRangePicker from "react-bootstrap-daterangepicker";
// import events from "./events";
import CustomModal from "./CustomModal";
import axios, { Axios } from "axios";
import { getCookie } from "../auth/cookie";
let todayStr = new Date().toISOString().replace(/T.*$/, "");
// fullcalendar 시간구하기
export default function Calendar() {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [modal, setModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const calendarRef = useRef(null);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [userId,setUserId]=useState();
  useEffect(()=>{
    setUserId(getCookie("x_auth").mem_data.mem_id)
  },[])
  const handleCloseModal = () => {
    handleClose();
    setModal(false);
  };
    function handleDateClick(arg) {
      // bind with an arrow function
      // console.log(arg.dateStr);
    };
  function handleDateSelect(selectInfo) {
    if (
      selectInfo.view.type === "timeGridWeek" ||
      selectInfo.view.type === "timeGridDay"
      ) {
        selectInfo.view.calendar.unselect();
        setState({ selectInfo, state: "create" });
        console.log("open modal create");
        console.log("모달 팝업 시 출력 값-->",selectInfo)
        setStart(selectInfo.start);
        setEnd(selectInfo.end);
      setModal(true);
    }
  }
  function renderEventContent(eventInfo) {
    return (
      <div>
        {/* <b>{eventInfo.timeText}</b> */}
        <i
          style={{
            whiteSpace: "nowrap", //요소 내부의 공백 처리방식(html 상의 한줄 공백)
            overflow: "hidden", //텍스트 한줄 처리하는 방법
            textOverflow: "ellipsis" //넘친 텍스트 컨텐츠가 사용자에게 보여지는 방식 설정(텍스트가 넘친 영역에 "..."표시->뒤에 생략된 텍스트가 있음을 알 수 있다.)
          }}
        >
          {eventInfo.event.title}
        </i>
      </div>
    );
  }
  function handleEventClick(clickInfo) {
    // console.log("open modal update, delete");
    setState({ clickInfo, state: "update" });
    // set detail
    setTitle(clickInfo.event.title);
    setStart(clickInfo.event.start);
    setEnd(clickInfo.event.end);
    setModal(true);
  }
// [{목록1}, {목록2}, ...]
// 배열의 요소 하나하나씩 변형시켜줄 때 사용 = map() filter()
// 일정이름 = title, 일정id = id, groupId, 시작일 = start, 종료일 = end
function loadEvents() {
  const userId = getCookie('x_auth').mem_data.mem_id
  axios.post(`http://localhost:8889/smart/programs/PT/timetable/11`)
  .then(e => {
    console.log("데이터맵찍기=-->",e.data)
    const eventList = e.data.map(item => ({
      id: item.reserv_pt_seq,
      groupId: userId ,
      title: item.trainer,
      start: new Date(item.start),
      end: new Date(item.end)
    }))
    // date 형식 맞춰주기
    // 마리아 DB date형식을 fullcalendar 형식 JS date() 형식으로  포맷팅 후에 넣기
    setCurrentEvents(eventList)
    console.log("이벤트리스트->",eventList)
  })
  .catch(e => console.log('캘린더 로드 실패', e))
}
  function handleEventDrop(checkInfo) {
    setState({ checkInfo, state: "drop" });
    setConfirmModal(true);
  }
  function handleEventResize(checkInfo) {
    setState({ checkInfo, state: "resize" });
    setConfirmModal(true);
  }
  function handleEdit() {
    state.clickInfo.event.setStart(start);
    state.clickInfo.event.setEnd(end);
    state.clickInfo.event.mutate({
      standardProps: { title }
    });
    handleClose();
  }
  function handleSubmit() {
    console.log("axios 실행 전 담아주는 값 찍기 시작 ->",state.selectInfo.startStr);
    console.log("axios 실행 전 담아주는 값 찍기 종료 ->",state.selectInfo.endStr);
    const newEvent = {
      mem_id: userId,
      trainer:title,
      // curr_pt_s_dt : state.selectInfo.startStr,
      // curr_pt_d_dt : state.selectInfo.endStr,
      start: state.selectInfo?.startStr || start.toISOString(),
      end: state.selectInfo?.endStr || end.toISOString(),
      allDay: state.selectInfo?.allDay || false
    };
    let calendarApi = calendarRef.current.getApi({
    });
    // let calendarApi = selectInfo.view.calendar
    axios
        .post('http://localhost:8889/smart/programs/PT/reserv', newEvent)
        .then((res, err) => {
            console.log("예약 성공시 전달한 값 값 -->",newEvent)
            alert('예약성공')
            window.location.replace(window.location)
        })
        .catch((err) => {
            alert(err)
        });
    // 들어가는 값 2022-11-07T00:30:00+09:00
    // 넣어야 하는 형식: YYYY-MM-DD HH-MM-SS
    calendarApi.addEvent(newEvent);
    handleClose();
  }
  function handleDelete() {
    state.clickInfo.event.remove();
    console.log('삭제버튼클릭시 가져오는 버튼 e 값 ->',state.clickInfo.event)
    const newEvent = {
      mem_id: userId,
      trainer:title,
      // curr_pt_s_dt : state.selectInfo.startStr,
      // curr_pt_d_dt : state.selectInfo.endStr,
      start: state.selectInfo?.startStr || start.toISOString(),
      end: state.selectInfo?.endStr || end.toISOString(),
      allDay: state.selectInfo?.allDay || false
    };
    axios.post('http://localhost:8889/smart/programs/PT/cancel',newEvent).then((res,err)=>{
      console.log("삭제 실행 시 보내주는 값 ->",newEvent)
      console.log("삭제 then-->",res)
    }).catch(err=>{
      alert(err)
      console.log(newEvent)
    })
    handleClose();
  }
  function handleClose() {
    setTitle("");
    setStart(new Date());
    setEnd(new Date());
    setState({});
    setModal(false);
  }
  const [state, setState] = useState({});
  return (
    <div className="App">
      <Container>
        <Row style={{ marginTop: 150 }}>
          <h1 style={{color:'white', textAlign:'center', marginBottom:50}}>Make a Booking</h1>
        </Row>
        <Row>
          <Col md={12}>
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: "prev,today,next",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay"
              }}
              buttonText={{  // 위에 버튼
                today: "Today's Time Table",
                month: "month",
                week: "week",
                day: "day",
                list: "list"
              }}
              initialView="timeGridWeek"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={weekendsVisible}
              events={currentEvents}
              select={handleDateSelect}
              eventContent={renderEventContent}
              eventClick={handleEventClick}
              eventDrop={handleEventDrop}
              eventResize={handleEventResize}
              datesSet={loadEvents}
              dateClick={handleDateClick}
              eventAdd={(e) => {
                console.log("eventAdd --> ", e);
                console.log("eventAdd start --> ", e.event._instance.range.start);
                console.log("eventAdd end --> ", e.event._instance.range.end);
              }}
              eventChange={(e) => {
                console.log("eventChange", e);
              }}
              eventRemove={(e) => {
                console.log("eventRemove", e);
              }}
            />
          </Col>
        </Row>
      </Container>
      <CustomModal
        title={state.state === "update" ? "Update Booking" : "Make a Booking"}
        isOpen={modal}
        toggle={handleCloseModal}
        onCancel={handleCloseModal}
        onSubmit={state.clickInfo ? handleEdit : handleSubmit}
        submitText={state.clickInfo ? "Update" : "Save"}
        onDelete={state.clickInfo && handleDelete}
        deleteText="Delete"
      >
        <FormGroup>
          <Label for="example-email">Trainer</Label>
          <br/>
          <select className="form-control" name="title"
          value={title} onChange={(e) => setTitle(e.target.value)}>
            <option value="" selected disabled hidden> Choose Trainer </option>
            <option value="Lily">Lily</option>
            <option value="Jessie">Jessie</option>
            <option value="John">John</option>
            <option value="Emma">Emma</option>
            <option value="Jonathan">Jonathan</option>
          </select>
        </FormGroup>
        <FormGroup>
          <Label for="example-email">Start Time - End Time</Label>
          <DateRangePicker
            initialSettings={{
              locale: {
                format: "M/DD hh:mm A"
              },
              startDate: start,
              endDate: end,
              timePicker: true
            }}
            onApply={(event, picker) => {
              setStart(new Date(picker.startDate));
              setEnd(new Date(picker.endDate));
            }}
          >
            <input className="form-control" type="text" />
          </DateRangePicker>
        </FormGroup>
      </CustomModal>
      <CustomModal
        title={state.state === "resize" ? "Resize Event" : "Drop Event"}
        isOpen={confirmModal}
        toggle={() => {
          state.checkInfo.revert();
          setConfirmModal(false);
        }}
        onCancel={() => {
          state.checkInfo.revert();
          setConfirmModal(false);
        }}
        cancelText="Cancel"
        onSubmit={() => setConfirmModal(false)}
        submitText={"OK"}
      >
        Do you want to {state.state} this event?
      </CustomModal>
    </div>
  );
}