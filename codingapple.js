const express = require('express'); //express
const app = express(); //express
app.use(express.urlencoded({extended : true})); //body-parser(in express)
const MongoClient = require('mongodb').MongoClient; //mongodb lib
app.set('view engine','ejs'); //ejs 등록

var db;
MongoClient.connect('mongodb+srv://00fanxi:wqt0519@cluster0.onkrt.mongodb.net/todoapp?retryWrites=true&w=majority',function(err,client){
	//연결되면 할일
	if (err) return console.log(err)

	db = client.db('todoapp');

	app.listen(8080, function(){
		console.log('listening on 8080');
	});
});


// 누군가 /pet 으로 방문을 하면
// pet 관련된 안내문을 띄워주자

app.get('/pet',function(req,res){
	res.send('펫용품을 쇼핑할 수 있는 페이지입니다.')
});

app.get('/beauty',function(req,res){
	res.send('뷰티용품 쇼핑 페이지임')
});

app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html')
});

app.get('/write',function(req,res){
	res.sendFile(__dirname + '/write.html')
});

// /list로 GET요청으로 접속하면
// 실제 DB에 저장된 데이터들로 예쁘게 꾸며진 HTML을 보여줌

app.get('/list',function(req,res){
	//디비에 저장된 post라는 collection안의 모든 데이터를 꺼내주세요.
	db.collection('post').find().toArray(function(err, result){
		res.render('list.ejs',{ posts : result });
	});
});

app.delete('/delete',function(req,res){
	console.log(req.body);
	req.body._id = parseInt(req.body._id);
	db.collection('post').deleteOne(req.body,function(err,result){
		console.log('삭제완료');
		res.status(200).send({message : '성공했습니다'});
	});
});


app.get('/detail/:id', function(req,res){
	db.collection('post').findOne({_id : parseInt(req.params.id)}, function(err,result){
		console.log(result)
		res.render('detail.ejs',{ data : result })
	})
});


// 어떤 사람이 /add 경로로 POST요청을 하면...
// ?? 을 해주세요

app.post('/add',function(req,res){
	db.collection('counter').findOne({name : '게시물갯수'},function(err,result){
		console.log(result.totalPost);
		var 총게시물갯수 = result.totalPost;

		db.collection('post').insertOne( {_id : 총게시물갯수 +1 ,제목 : req.body.title, 날짜 : req.body.date},function(err,result){
			console.log('저장완료');
			res.send('전송완료');
			db.collection('counter').updateOne({name : '게시물갯수'},{$inc : {totalPost : 1}},function(){})
		});

	});
});
