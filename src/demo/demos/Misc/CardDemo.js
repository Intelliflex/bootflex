import React, { useState } from "react";
//import './flex.scss'
import {
  Flex,
  FlexCard,
  B,
  Spacer,
  Lead,
  Info,
  Row,
  Col,
  Code,
  getPropsTable,
} from "bootflex";
import { Jumbotron, Container, Tabs, Tab, Form } from "react-bootstrap";

const CardDemo = () => {
  // eslint-disable-next-line
  const [switchFill, setFill] = useState(true);
  return (
    <>
      <FlexCard
        noborder
        variant={switchFill ? "fixed" : "grow"}
        fill={switchFill}
      >
        <FlexCard.Header className="p-2">
          <Flex.Item order="1" content="LEFT AREA" />
          <Flex.Item
            order="2"
            align="center"
            content="THIS IS A CARD HEADER (WITH FILL, FLUSH & SQUARE PROPERTIES)"
          />
          <Flex.Item order="3" align="right" content="RIGHT AREA" />
        </FlexCard.Header>
        <FlexCard.Body>
          <Jumbotron className="p-4">
            <h1>FlexCard - Flexible Card Layout</h1>
            <Lead justify>
              FlexCard is an extension of the standard Bootstrap card layout
              that also allow for perfect sizing within Bootflex Layouts. Each
              Card has a fill property (default is true) that will expand the
              cards perimiter to the parent container or otherwise size
              according to content.
            </Lead>
            <Info>
              <Form.Check
                type="checkbox"
                className="flex-checkbox"
                label="Set Fill Property (notice how card is bound to viewport)"
                checked={switchFill}
                onChange={(e) => setFill(!switchFill)}
              />
            </Info>
          </Jumbotron>
          <TabContent />
        </FlexCard.Body>

        <FlexCard.Footer>
          <Flex.Item
            order="1"
            align="center"
            content="THIS IS MY FOOTER (CENTER ALIGNED)"
          />
        </FlexCard.Footer>
      </FlexCard>
    </>
  );
};

const TabContent = (props) => {
  const { fluid } = props;
  const [key, setKey] = useState("home");
  return (
    <Tabs
      id="page-tabs"
      fluid={fluid}
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey="home" title="Example">
        <Demo fluid={fluid} />
      </Tab>
      <Tab eventKey="types" title="Documentation">
        <Documentation />
      </Tab>
      <Tab eventKey="source" title="Source Code">
        <Code title="Source Code">{code}</Code>
      </Tab>
    </Tabs>
  );
};

const Demo = (props) => {
  return (
    <>
      <Spacer />

      <Info>
        The text your are reading is located inside a FlexCard. The fill
        property expands the card to use all space within the layout container
        (in this case the layout Body). The optional header and footer are a
        flex box container that allows items with to be positioned by order and
        alignment using Flex.Item component children.
      </Info>
      <Info>
        Below are some Flex Cards that do not not have the fill property, The
        first card is set to grow will grow to fill required height (being that
        of the largest content - Card 4), the second card haas a height setting
        and will overflow as required.
      </Info>
      <Info>
        Using the cascade layout for cards without the fill property works fine
        as the overflow scrollpar will be to the outside of the header. Be
        careful when using the cascade items and fill property together, as the
        scroll bar will align underneath the cascade margin which is
        asthetically not ideal and the footer will overflow.
      </Info>

      <Container className="mt-3" fluid>
        <Row>
          <Col compact size={3}>
            <FlexCard flush>
              <FlexCard.Header>CARD #1 NO HEIGHT</FlexCard.Header>
              <FlexCard.Body>
                <B className="mb-2" primary>
                  This card has does not have fill property - its contents will
                  grow to height required by content.
                </B>
                {lorem3}
              </FlexCard.Body>
            </FlexCard>
          </Col>
          <Col compact size={3}>
            <FlexCard cascade flush height="300px">
              <FlexCard.Header
                cascade
                bg="flex-gradient-sunny-morning text-dark"
              >
                CARD #2 HEIGHT=300px
              </FlexCard.Header>
              <FlexCard.Body>
                <B className="mb-2" primary>
                  This card has has a fixed height. Content overflow will
                  trigger a vertical scrollbar to appear.
                </B>
                {lorem3}
              </FlexCard.Body>
            </FlexCard>
          </Col>
          <Col compact size={3}>
            <FlexCard square fill flush>
              <FlexCard.Header>CARD #3 </FlexCard.Header>
              <FlexCard.Body>
                <B className="mb-2" primary>
                  This card has fill property set causing the card to grow to
                  the size of the parent row, matching the tallest existing
                  item. It has a square property resulting in square corners.
                </B>
                {lorem3}
              </FlexCard.Body>
            </FlexCard>
          </Col>
          <Col compact size={3}>
            <FlexCard cascade flush>
              <FlexCard.Header cascade bg="flex-gradient-blue text-light">
                THIS IS CARD #4
              </FlexCard.Header>
              <FlexCard.Body>
                {" "}
                <B className="mb-2" primary>
                  This card has cascade property set, causing its header to
                  cascade into the body of the card. It also has a gradient
                </B>
                {lorem4}
              </FlexCard.Body>
              <FlexCard.Footer>Footer for Card #4</FlexCard.Footer>
            </FlexCard>
          </Col>
        </Row>
      </Container>
    </>
  );
};

const Documentation = (props) => {
  let structure = `
    <FlexCard>
      <FlexCard.Header></FlexCard.Header>
      <FlexCard.Body></FlexCard.Body>
      <FlexCard.Footer></FlexCard.Footer>
		</FlexCard>
		`;
  return (
    <>
      <Container>
        <Spacer />
        <p>
          The operation of the Card container is very similar to the Bootstrap
          Card (it is Bootstrap card under the surface) or React-Bootstrap Card.
          The main differences are with some additional properties that simplify
          use within Bootflex layouts and the addition of a cascading card
          effect, althout if you have existing card layouts they will work
          perfectly ok.
        </p>
        <p>A Bootflex card has the following structure</p>
        <Code>{structure}</Code>
        <Spacer />
        {getPropsTable(properties)}
      </Container>
    </>
  );
};

export default CardDemo;

let lorem3 = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed, hic atque, voluptates error temporibus ratione harum suscipit culpa tempore delectus pariatur nobis distinctio consequatur sequi sapiente dignissimos nam, assumenda ea?
Nesciunt cupiditate sunt, eligendi in assumenda laboriosam repudiandae, itaque magni dicta alias sequi. Nulla omnis obcaecati ullam, earum quos dolor sunt eos vel quasi excepturi non repellendus esse, laudantium pariatur!
Iure, maiores fugiat! Error sed autem voluptatum quibusdam. Eius praesentium, odio nihil porro, dolores dolorum recusandae hic iste quo labore itaque deserunt perferendis, quaerat consequatur. Totam, laboriosam expedita? Odio, quidem.`;

let lorem4 = `
Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet suscipit quae vero eum consequuntur rem soluta nostrum, animi fugit non. Necessitatibus minima suscipit dolor voluptate, sed obcaecati impedit ipsam porro.
Sit pariatur, laboriosam et labore quibusdam numquam dignissimos ipsam reiciendis fuga, inventore aliquid architecto iste nobis? Possimus ex iusto porro officiis ducimus at tempore, quibusdam explicabo ad. Sit, repellendus tempora.
Quibusdam, beatae dolores perspiciatis ratione earum in amet reprehenderit maiores molestiae nemo repellat asperiores sequi unde cupiditate quidem, voluptatem itaque sed. Magni cumque quia nam animi iure qui similique ut!
Asperiores illo aliquam doloribus iste id facilis. Et aperiam maxime sunt inventore quibusdam beatae odit, temporibus repellat, ea debitis non eligendi minus incidunt at hic exercitationem cupiditate deleniti harum porro?`;

// eslint-disable-next-line
let lorem = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam similique quos nostrum obcaecati eius natus labore perspiciatis, maiores ducimus? Eum, praesentium laboriosam. Temporibus aspernatur, dolores autem quos eos repellendus ea?
Sed nisi temporibus maiores eius eligendi commodi, quo ut ipsa et tempore voluptates similique iusto tempora velit, natus quidem corporis, ullam architecto. Necessitatibus, dicta nulla excepturi officiis quasi quisquam itaque.
Aspernatur ipsa tenetur odit! Mollitia quaerat eius earum unde, animi asperiores deserunt, cupiditate voluptas nesciunt quod nam ut beatae doloremque! Aliquam, ab laudantium delectus deleniti animi quibusdam. Tempora, dolorem totam.
Quod ratione ea, atque vel hic natus deserunt voluptatibus quidem nihil! Quod, voluptates. Nesciunt inventore debitis sint tenetur distinctio repudiandae suscipit totam ducimus labore voluptate iure, ex error hic consequatur?
Error maiores cupiditate nemo! Dolor excepturi iste quaerat sunt, rem voluptatibus vitae quas velit? Sequi laborum, voluptatum fugiat autem eaque, porro quaerat ex iste quos ipsum ipsam amet numquam atque.
Dolores perspiciatis odit, earum ea modi doloremque et vel dolorem sint iste consectetur sed nostrum soluta nemo minus. Quis soluta dolore provident temporibus nobis vero saepe sint ex error totam.
Nulla iure veritatis quibusdam iste excepturi blanditiis placeat exercitationem repellendus ratione, suscipit magnam corporis quas sint est sunt vitae aliquid minus dignissimos odio soluta facere libero provident! Sint, perferendis quam!
Eos debitis ea placeat aspernatur perspiciatis cupiditate expedita dolorem in mollitia incidunt repudiandae numquam at, est asperiores modi, natus quidem harum deleniti. Fugit, nulla sint dicta consequuntur numquam deleniti quia.
Commodi mollitia sapiente totam minima consectetur odio repellendus aperiam maiores doloribus, fugit nam itaque dolorem veritatis consequuntur, sit consequatur nulla placeat? Veniam aliquam non quis quos cumque voluptates nobis fuga.
Dolorum blanditiis doloremque accusantium asperiores suscipit aperiam fugit hic unde, eveniet facilis minima, possimus ad ducimus distinctio consectetur recusandae. In, enim. Similique tempora alias accusantium expedita deserunt aperiam reprehenderit dolor!
Repudiandae vitae esse veritatis eaque optio labore autem asperiores iste odit libero nemo officia excepturi aspernatur expedita inventore suscipit sapiente tenetur maiores, vero numquam enim! Laborum impedit aperiam laboriosam officia?
Tempore nemo deleniti perspiciatis non debitis. Vero, earum laboriosam quibusdam dolorem hic error molestias quae, neque deserunt quam odio harum maxime quis repudiandae, culpa dolor tempore quisquam commodi iure provident.
Accusamus, est eius facere qui adipisci exercitationem hic vero dolore consectetur atque. Quod itaque quae eligendi obcaecati dignissimos unde asperiores, iusto ipsa magnam. Pariatur, praesentium vitae mollitia dolorum maxime accusamus.
Laudantium repellendus impedit eaque nostrum sit sequi quidem asperiores eius, porro modi quo, dignissimos vel temporibus cupiditate dolorem, suscipit autem quis dicta? Odit ex eaque necessitatibus. Assumenda eligendi id voluptatum.
Cupiditate aliquam praesentium minima sit repellat quasi velit ipsam temporibus consequatur quibusdam labore nesciunt quae, atque delectus culpa nam ab totam. Eveniet, tempore aliquid? Mollitia sit pariatur maiores inventore possimus.
A facere natus cumque magnam quam itaque aspernatur ipsam aut neque dolores sed libero quisquam dicta corrupti ad, veritatis, eligendi at tenetur labore, esse doloremque dolore commodi? At, necessitatibus nemo.
Nesciunt, sequi pariatur. Numquam maxime omnis sapiente quisquam quis accusantium dicta voluptate nostrum. Dicta id illum culpa fugiat maxime sapiente quo ipsa consectetur aliquid, suscipit ea quas, iste optio iure!
Fugiat nam quas nemo in cumque consectetur expedita nesciunt cum deleniti laboriosam itaque quod similique mollitia pariatur minima consequatur ratione, ab, voluptatem veniam, fugit assumenda maiores recusandae placeat? Quae, molestiae!
`;
let code = `
const Demo = (props) => {
  return (
    <>
      <Spacer />
      <Info>
        The text your are reading is located inside a FlexCard. The fill property expands the card to use all
        space within the layout container (in this case the layout Body). The optional header and footer are a
        flex box container that allows items with to be positioned by order and alignment using Flex.Item
        component children.
      </Info>
      <Info>
        Below are some Flex Cards that do not not have the fill property, The first card is set to grow will
        grow to fill required height (being that of the largest content - Card 4), the second card haas a
        height setting and will overflow as required.
      </Info>
      <Spacer x2 />
      <Container fluid>
        <Row>
          <Col compact size={3}>
            <FlexCard flush>
              <FlexCard.Header>CARD #1 NO HEIGHT</FlexCard.Header>
              <FlexCard.Body>
                <B className='mb-2' primary>
                  This card has does not have fill property - its contents will grow to height required by
                  content.
                </B>
                {lorem3}
              </FlexCard.Body>
            </FlexCard>
          </Col>
          <Col compact size={3}>
            <FlexCard cascade flush height='300px'>
              <FlexCard.Header cascade bg='flex-gradient-sunny-morning text-dark'>
                CARD #2 HEIGHT=300px
              </FlexCard.Header>
              <FlexCard.Body>
                <B className='mb-2' primary>
                  This card has has a fixed height. Content overflow will trigger a vertical scrollbar to
                  appear.
                </B>
                {lorem3}
              </FlexCard.Body>
            </FlexCard>
          </Col>
          <Col compact size={3}>
            <FlexCard fill flush>
              <FlexCard.Header>CARD #3 </FlexCard.Header>
              <FlexCard.Body>
                <B className='mb-2' primary>
                  This card has fill property set causing the card to grow to the size of the parent row,
                  matching the tallest existing item.
                </B>
                {lorem3}
              </FlexCard.Body>
            </FlexCard>
          </Col>
          <Col compact size={3}>
            <FlexCard cascade flush>
              <FlexCard.Header cascade bg='flex-gradient-blue text-light'>
                THIS IS CARD #4
              </FlexCard.Header>
              <FlexCard.Body>
                {' '}
                <B className='mb-2' primary>
                  This card has cascade property set, causing its header to cascade into the body of the card.
                  It also has a gradient
                </B>
                {lorem4}
              </FlexCard.Body>
              <FlexCard.Footer>Footer for Card #4</FlexCard.Footer>
            </FlexCard>
          </Col>
        </Row>
      </Container>
    </>
  )
}

`;

let properties = {
  FlexCard: {
    fill: `When fill property is supplied the card will expand to match the container it is used in. When fill is not supplied the Card will size itself to suit content.`,
    square: `This property will render the header with square borders. This is useful when using the fill property so that card fill the entire layout container`,
    noborder: `Normally a thin border is placed around the card. Sometimes, especially when you have a card occupying the entire body content area of the Layout you will not want borders as edges will be flush to the body content section. In this case supply the noborder prop.`,
    flush: `When flush prop is specified there will be no padding or margins applied to the card`,
    cascade: `This options allows cascade style headers on your card. The cascade property needs to be added to both the FlexCard and FlexCard.Header.`,
    height: `Sets the height of card when you need specific control over height. By default the card in size will grow according to content.`,
    outerClass: `This class targets the outer container used for Card Layout. Use this if you want padding outside the card - eg: className='p-2'. Otherwise to add classes to Card, use className`,
  },

  "FlexCard.Header": {
    bg: `This is a CSS class for background. You can use a standard Bootstrap color (eg: bg-primary) or one of the gradient schemed provided in Bootflex.`,
    square: `This property will render the header with square borders. This is useful when using the fill property so that card fill the entire layout container`,
    cascade: `This options allows cascade style headers on your card. The cascade property needs to be added to both the FlexCard and FlexCard.Header.`,
  },
  "FlexCard.Body": {
    outerClass: `This class targets the outer container used for Card Layout. Use this if you want padding outside the card - eg: className='p-2'. Otherwise to add classes to Card, use className`,
  },
  "FlexCard.Footer": {
    outerClass: `This class targets the outer container used for Card Layout. Use this if you want padding outside the card - eg: className='p-2'. Otherwise to add classes to Card, use className`,
  },
};
