# import necessary libraries
# from models import create_classes
import os
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, or_
from sqlalchemy.ext.automap import automap_base

import pickle

from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)



#todo this needs updateing
engine = create_engine("sqlite:///Database/Conservation.db")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
print(Base.classes.keys())


kp = Base.classes.KnownSpecies
cep = Base.classes.CriticallyEndangeredSpecies
es = Base.classes.EndangeredSpecies
tp = Base.classes.ThreatenedSpecies
vp = Base.classes.VulnerableSpecies
c = Base.classes.Countries

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


# ---------------------------------------------------------
# Web site
@app.route("/")
def data():

    return render_template("index.html")


#--------------------Known Species Table------------------------
@app.route("/api/knownSpecies")
def known_species():

    session = Session(engine)
    results = session.query(kp.Country, kp.Species,kp.Value).all()
    results = [list(r) for r in results]

    table_results = {
        "table": results
    }

    session.close()
    return jsonify(table_results)


@app.route("/api/criticallyEndangeredSpecies")
def criticallyEndangeredSpecies():

    session = Session(engine)
    results = session.query(cep.Country, cep.Species, cep.Value).all()
    results = [list(r) for r in results]

    table_results = {
        "table": results
    }

    session.close()
    return jsonify(table_results)

@app.route("/api/endangeredSpecies")
def endangeredSpecies():

    session = Session(engine)
    results = session.query(es.Country, es.Species, es.Value).all()
    results = [list(r) for r in results]

    table_results = {
        "table": results
    }

    session.close()
    return jsonify(table_results)

@app.route("/api/threatenedSpecies")
def threatenedSpecies():

    session = Session(engine)
    results = session.query(tp.Country, tp.Species, tp.Value).all()
    results = [list(r) for r in results]

    table_results = {
        "table": results
    }

    session.close()
    return jsonify(table_results)


@app.route("/api/vulenerableSpecies")
def vulenerableSpecies():

    session = Session(engine)
    results = session.query(vp.Country, vp.Species, vp.Value).all()
    results = [list(r) for r in results]

    table_results = {
        "table": results
    }

    session.close()
    return jsonify(table_results)

@app.route("/api/countries")
def countries():

    session = Session(engine)
    results = session.query(c.Country).all()
    results = [list(r) for r in results]

    table_results = {
        "table": results
    }

    session.close()
    return jsonify(table_results)



if __name__ == "__main__":
    app.run()
